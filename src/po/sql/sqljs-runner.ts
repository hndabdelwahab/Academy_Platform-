import schemaSql from '@/po/curriculum/erp-schema.sql?raw';

interface SqlJsStatic {
  Database: new (data?: ArrayLike<number> | null) => Database;
}

interface Database {
  run(sql: string, params?: unknown[]): Database;
  exec(sql: string): QueryExecResult[];
  close(): void;
}

interface QueryExecResult {
  columns: string[];
  values: unknown[][];
}

type InitSqlJsFn = (config?: {
  locateFile?: (file: string) => string;
}) => Promise<SqlJsStatic>;

declare global {
  interface Window {
    initSqlJs?: InitSqlJsFn;
  }
}

const SQL_JS_CDN = 'https://sql.js.org/dist/';

let db: Database | null = null;
let initPromise: Promise<Database> | null = null;

function loadSqlJsScript(): Promise<InitSqlJsFn> {
  if (typeof window.initSqlJs === 'function') {
    return Promise.resolve(window.initSqlJs);
  }

  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-sqljs]');
    if (existing) {
      existing.addEventListener('load', () => {
        if (window.initSqlJs) resolve(window.initSqlJs);
        else reject(new Error('sql.js loaded but initSqlJs is missing'));
      });
      existing.addEventListener('error', () => reject(new Error('Failed to load sql.js')));
      return;
    }

    const script = document.createElement('script');
    script.src = `${SQL_JS_CDN}sql-wasm.js`;
    script.async = true;
    script.dataset.sqljs = 'true';
    script.onload = () => {
      if (window.initSqlJs) resolve(window.initSqlJs);
      else reject(new Error('sql.js loaded but initSqlJs is missing'));
    };
    script.onerror = () => reject(new Error('Failed to load sql.js from CDN'));
    document.head.appendChild(script);
  });
}

async function loadDatabase(): Promise<Database> {
  if (db) return db;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const initSqlJs = await loadSqlJsScript();
    const SQL = await initSqlJs({
      locateFile: (file) => `${SQL_JS_CDN}${file}`,
    });
    db = new SQL.Database();
    db.run(schemaSql);
    return db;
  })();

  return initPromise;
}

export async function initSQL(): Promise<Database> {
  return loadDatabase();
}

export async function runSQL(query: string): Promise<{ columns: string[]; rows: unknown[][]; error?: string }> {
  try {
    const database = await loadDatabase();
    const results = database.exec(query);
    if (results.length === 0) {
      return { columns: [], rows: [], error: undefined };
    }
    const { columns, values } = results[0];
    return { columns, rows: values };
  } catch (e) {
    return {
      columns: [],
      rows: [],
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

export async function getTables(): Promise<string[]> {
  const database = await loadDatabase();
  const results = database.exec(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name",
  );
  if (results.length === 0) return [];
  return results[0].values.map((row) => String(row[0]));
}

export async function getTableSchema(tableName: string): Promise<{ columns: string[]; rows: unknown[][] }> {
  const database = await loadDatabase();
  // Only allow simple table names to avoid SQL injection via PRAGMA
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName)) {
    return { columns: [], rows: [] };
  }
  const results = database.exec(`PRAGMA table_info(${tableName})`);
  if (results.length === 0) return { columns: [], rows: [] };
  return { columns: results[0].columns, rows: results[0].values };
}

export async function resetDatabase(): Promise<void> {
  if (db) {
    db.close();
    db = null;
    initPromise = null;
  }
  await loadDatabase();
}
