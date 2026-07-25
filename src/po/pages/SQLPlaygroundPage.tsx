import { useState, useEffect } from 'react';
import { CodeEditor } from '@/po/components/editor/CodeEditor';
import { runSQL, getTables, getTableSchema } from '@/sql/sqljs-runner';
import { useProgressStore } from '@/po/store/useProgress';
import { t } from '@/po/i18n';
import { Play, Database, Table, Loader2 } from 'lucide-react';

const DEFAULT_QUERY = `-- ERP Practice Database — SQL Playground
-- Preloaded with realistic ERP schema: clients, items, stock, sales orders, invoices

SELECT c.name AS client_name,
       so.id AS order_id,
       so.status,
       so.total_amount
FROM sales_orders so
JOIN clients c ON c.id = so.client_id
WHERE so.status = 'confirmed'
ORDER BY so.total_amount DESC;
`;

export function SQLPlaygroundPage() {
  const lang = useProgressStore((s) => s.settings.language);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<unknown[][]>([]);
  const [error, setError] = useState('');
  const [running, setRunning] = useState(false);
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [tableSchema, setTableSchema] = useState<{ columns: string[]; rows: unknown[][] } | null>(null);

  useEffect(() => {
    getTables().then(setTables);
  }, []);

  const handleRun = async () => {
    setRunning(true);
    setError('');
    const result = await runSQL(query);
    if (result.error) {
      setError(result.error);
      setColumns([]);
      setRows([]);
    } else {
      setColumns(result.columns);
      setRows(result.rows);
    }
    setRunning(false);
  };

  const handleTableClick = async (table: string) => {
    setSelectedTable(table);
    const schema = await getTableSchema(table);
    setTableSchema(schema);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{t('sqlPlayground', lang)}</h1>
        <p className="text-text-secondary mt-1">Interactive SQL with preloaded ERP schema (clients, orders, stock, invoices, transfers)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="card lg:col-span-1">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
            <Database className="w-4 h-4 text-accent" /> {t('tables', lang)}
          </h3>
          <div className="space-y-1 max-h-[200px] overflow-y-auto">
            {tables.map((table) => (
              <button
                key={table}
                onClick={() => handleTableClick(table)}
                className={`w-full text-left px-2 py-1.5 rounded text-sm font-mono transition-colors ${
                  selectedTable === table ? 'bg-accent-muted text-accent' : 'hover:bg-surface-hover text-text-secondary'
                }`}
              >
                {table}
              </button>
            ))}
          </div>
          {tableSchema && selectedTable && (
            <div className="mt-4 border-t border-border pt-3">
              <h4 className="text-xs font-semibold text-text-muted mb-2 flex items-center gap-1">
                <Table className="w-3 h-3" /> {selectedTable}
              </h4>
              <div className="text-xs font-mono space-y-1">
                {tableSchema.rows.map((row, i) => (
                  <div key={i} className="text-text-secondary">
                    <span className="text-accent">{String(row[1])}</span>{' '}
                    <span className="text-text-muted">{String(row[2])}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-3 space-y-4">
          <CodeEditor value={query} onChange={setQuery} language="sql" height="250px" />

          <button onClick={handleRun} disabled={running} className="btn-primary flex items-center gap-2">
            {running ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            {t('runQuery', lang)}
          </button>

          {error && (
            <div className="terminal-output text-danger">{error}</div>
          )}

          {columns.length > 0 && (
            <div className="overflow-x-auto border border-border rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-elevated border-b border-border">
                    {columns.map((col) => (
                      <th key={col} className="px-4 py-2 text-left font-medium text-accent font-mono">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className="border-b border-border hover:bg-surface-hover">
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-2 font-mono text-text-secondary">{String(cell ?? 'NULL')}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-text-muted px-4 py-2">{rows.length} row(s) returned</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
