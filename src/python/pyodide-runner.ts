let pyodideInstance: unknown = null;
let loadingPromise: Promise<unknown> | null = null;

declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (config: { batched: (msg: string) => void }) => void;
  setStderr: (config: { batched: (msg: string) => void }) => void;
}

const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';

async function loadPyodideScript(): Promise<void> {
  if (document.querySelector('script[data-pyodide]')) return;
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${PYODIDE_CDN}pyodide.js`;
    script.dataset.pyodide = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Pyodide'));
    document.head.appendChild(script);
  });
}

export async function initPyodide(): Promise<PyodideInterface> {
  if (pyodideInstance) return pyodideInstance as PyodideInterface;
  if (loadingPromise) return loadingPromise as Promise<PyodideInterface>;

  loadingPromise = (async () => {
    await loadPyodideScript();
    const pyodide = await window.loadPyodide({ indexURL: PYODIDE_CDN });
    pyodideInstance = pyodide;
    return pyodide;
  })();

  return loadingPromise as Promise<PyodideInterface>;
}

export async function runPython(
  code: string,
  onOutput?: (text: string) => void,
  onError?: (text: string) => void,
): Promise<{ output: string; error: string; success: boolean }> {
  let output = '';
  let error = '';

  try {
    const pyodide = await initPyodide();
    pyodide.setStdout({ batched: (msg) => { output += msg + '\n'; onOutput?.(msg); } });
    pyodide.setStderr({ batched: (msg) => { error += msg + '\n'; onError?.(msg); } });
    await pyodide.runPythonAsync(code);
    return { output: output.trim(), error: error.trim(), success: !error };
  } catch (e) {
    const errMsg = e instanceof Error ? e.message : String(e);
    error += errMsg;
    onError?.(errMsg);
    return { output: output.trim(), error: error.trim(), success: false };
  }
}

export function isPyodideLoaded(): boolean {
  return pyodideInstance !== null;
}
