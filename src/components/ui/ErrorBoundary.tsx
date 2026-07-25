import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App render error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 32, fontFamily: 'system-ui, sans-serif', maxWidth: 640 }}>
          <h1 style={{ color: '#ef4444' }}>Something went wrong</h1>
          <p style={{ color: '#64748b' }}>
            The app failed to load. Try clearing site data for this localhost port, then refresh.
          </p>
          <pre style={{ background: '#1e293b', color: '#f87171', padding: 16, borderRadius: 8, overflow: 'auto' }}>
            {this.state.error.message}
          </pre>
          <button
            type="button"
            onClick={() => {
              // Clear only the program selection gate; keep both academies' progress intact.
              localStorage.removeItem('academy-selected-program');
              window.location.href = '/';
            }}
            style={{ marginTop: 16, padding: '8px 16px', cursor: 'pointer', marginRight: 8 }}
          >
            Back to program selection
          </button>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('erp-academy-progress');
              localStorage.removeItem('po-academy-progress');
              localStorage.removeItem('academy-selected-program');
              window.location.reload();
            }}
            style={{ marginTop: 16, padding: '8px 16px', cursor: 'pointer' }}
          >
            Reset all progress &amp; reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
