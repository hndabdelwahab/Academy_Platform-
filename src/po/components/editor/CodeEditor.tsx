import { lazy, Suspense } from 'react';

const Monaco = lazy(() => import('@monaco-editor/react'));

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  height?: string;
}

export function CodeEditor({
  value,
  onChange,
  language = 'python',
  readOnly = false,
  height = '300px',
}: CodeEditorProps) {
  return (
    <div className="monaco-container">
      <Suspense fallback={<div className="terminal-output" style={{ height }}>Loading editor...</div>}>
        <Monaco
          height={height}
          language={language}
          value={value}
          onChange={(v) => onChange?.(v ?? '')}
          theme="vs-dark"
          options={{
            readOnly,
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'JetBrains Mono, Fira Code, monospace',
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: 'on',
          }}
        />
      </Suspense>
    </div>
  );
}
