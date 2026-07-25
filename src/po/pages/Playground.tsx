import { useState } from 'react';
import { CodeEditor } from '@/po/components/editor/CodeEditor';
import { OutputPanel } from '@/po/components/editor/OutputPanel';
import { runPython } from '@/python/pyodide-runner';
import { useProgressStore } from '@/po/store/useProgress';
import { t } from '@/po/i18n';
import { Play, Loader2 } from 'lucide-react';

const DEFAULT_CODE = `# Python Playground — ERP Developer Mastery Academy
# Write and run Python code here. Pyodide runs Python in your browser.

company = "Acme ERP Solutions"
modules = ["sale", "stock", "account", "purchase"]
active_users = 128

print(f"Company: {company}")
print(f"Active modules: {len(modules)}")
print(f"Users: {active_users}")

for mod in modules:
    print(f"  - {mod}")
`;

export function Playground() {
  const lang = useProgressStore((s) => s.settings.language);
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [running, setRunning] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setRunning(true);
    setLoading(true);
    setOutput('');
    setError('');
    const result = await runPython(code);
    setOutput(result.output);
    setError(result.error);
    setRunning(false);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{t('playground', lang)}</h1>
        <p className="text-text-secondary mt-1">Python execution via Pyodide (WebAssembly) — runs entirely in your browser</p>
      </div>

      <CodeEditor value={code} onChange={setCode} language="python" height="450px" />

      <div className="flex gap-2">
        <button onClick={handleRun} disabled={running} className="btn-primary flex items-center gap-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          {t('runCode', lang)}
        </button>
        <button onClick={() => { setCode(DEFAULT_CODE); setOutput(''); setError(''); }} className="btn-secondary">
          {t('clear', lang)}
        </button>
      </div>

      <OutputPanel output={output} error={error} loading={running} />
    </div>
  );
}
