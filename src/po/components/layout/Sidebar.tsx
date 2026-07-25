import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Map, ClipboardCheck, BarChart3, BookOpen, Settings, Target, Compass,
} from 'lucide-react';
import { useProgressStore } from '@/po/store/useProgress';
import { t } from '@/po/i18n';

const mainNav = [
  { to: '/', icon: LayoutDashboard, labelKey: 'dashboard' as const },
  { to: '/assessment', icon: ClipboardCheck, labelKey: 'assessment' as const },
  { to: '/roadmap', icon: Map, labelKey: 'roadmap' as const },
  { to: '/scores', icon: BarChart3, labelKey: 'scores' as const },
  { to: '/dictionary', icon: BookOpen, labelKey: 'dictionary' as const },
  { to: '/labs/how-scrum-works', icon: Compass, labelKey: 'howCodeWorks' as const },
];

export function Sidebar() {
  const lang = useProgressStore((s) => s.settings.language);

  return (
    <aside className="w-64 bg-surface-elevated border-e border-border flex flex-col h-full shrink-0">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-text-primary leading-tight">
              {lang === 'ar' ? 'أكاديمية مالك المنتج' : 'PO Mastery Academy'}
            </h1>
            <p className="text-[10px] text-text-muted">
              {lang === 'ar' ? 'من المبتدئ إلى الاحتراف' : 'Beginner → Professional'}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted px-3 mb-2">
          {t('home', lang)}
        </p>
        {mainNav.map(({ to, icon: Icon, labelKey }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-accent-muted text-accent font-medium'
                  : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
              }`
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            {t(labelKey, lang)}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-border">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
              isActive ? 'bg-accent-muted text-accent' : 'text-text-secondary hover:bg-surface-hover'
            }`
          }
        >
          <Settings className="w-4 h-4" />
          {t('settings', lang)}
        </NavLink>
      </div>
    </aside>
  );
}
