interface OutputPanelProps {
  output: string;
  error?: string;
  loading?: boolean;
}

export function OutputPanel({ output, error, loading }: OutputPanelProps) {
  return (
    <div className="mt-2">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Terminal Output</span>
        {loading && <span className="text-xs text-accent animate-pulse">Running...</span>}
      </div>
      <div className="terminal-output">
        {error && <pre className="text-danger whitespace-pre-wrap">{error}</pre>}
        {output && <pre className="whitespace-pre-wrap">{output}</pre>}
        {!output && !error && !loading && (
          <span className="text-text-muted italic">Run code to see output here...</span>
        )}
      </div>
    </div>
  );
}
