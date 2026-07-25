import { useProgressStore } from '@/store/useProgress';
import { t } from '@/i18n';

export function SettingsPage() {
  const { settings, setApiKey, resetProgress } = useProgressStore();
  const lang = settings.language;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{t('settings', lang)}</h1>
      </div>

      <div className="card space-y-4">
        <div>
          <label className="text-sm font-medium text-text-primary">Anthropic API Key (Optional)</label>
          <p className="text-xs text-text-muted mt-1">{t('aiOptional', lang)}</p>
          <input
            type="password"
            className="input-field mt-2"
            placeholder="sk-ant-..."
            value={settings.apiKey ?? ''}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="text-xs text-text-muted mt-1">{t('noApiKey', lang)}</p>
        </div>
      </div>

      <div className="card border-danger/30">
        <h3 className="font-semibold text-danger">Reset Progress</h3>
        <p className="text-sm text-text-secondary mt-1">Clear all progress, scores, and assessment results.</p>
        <button
          onClick={() => { if (confirm('Reset all progress? This cannot be undone.')) resetProgress(); }}
          className="btn-secondary mt-3 text-danger border-danger/30"
        >
          Reset All Progress
        </button>
      </div>
    </div>
  );
}
