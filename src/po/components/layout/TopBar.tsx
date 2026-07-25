import { Globe, Moon, Sun } from 'lucide-react';
import { useProgressStore } from '@/po/store/useProgress';
import { t } from '@/po/i18n';

export function TopBar() {
  const { settings, setLanguage, setTheme, xp, level } = useProgressStore();
  const lang = settings.language;
  const isDark = settings.theme === 'dark';

  const toggleLanguage = () => setLanguage(lang === 'en' ? 'ar' : 'en');
  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <header className="h-14 bg-surface-elevated border-b border-border flex items-center justify-between px-6 shrink-0">
      <div />

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-text-secondary mr-2">
          <span className="badge bg-accent-muted text-accent">{t('level', lang)} {level}</span>
          <span className="badge bg-surface-hover text-text-secondary">{xp} {t('xp', lang)}</span>
        </div>

        <button
          onClick={toggleLanguage}
          className="btn-ghost flex items-center gap-1.5 text-sm font-medium"
          title={t('language', lang)}
        >
          <Globe className="w-4 h-4" />
          {lang === 'en' ? t('english', lang) : t('arabic', lang)}
        </button>

        <button
          onClick={toggleTheme}
          className="btn-ghost"
          title={isDark ? t('lightMode', lang) : t('darkMode', lang)}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
