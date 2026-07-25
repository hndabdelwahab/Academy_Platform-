import { useState } from 'react';
import { TERMINOLOGY, searchTerms } from '@/curriculum/terminology';
import { useProgressStore } from '@/store/useProgress';
import { t } from '@/i18n';
import type { TermMastery } from '@/types';
import { Search } from 'lucide-react';

const MASTERY_COLORS: Record<TermMastery, string> = {
  unknown: 'bg-surface-hover text-text-muted',
  learning: 'bg-warning/20 text-warning',
  understood: 'bg-info/20 text-info',
  mastered: 'bg-success/20 text-success',
};

export function DictionaryPage() {
  const { settings, terminologyMastery, updateTermMastery } = useProgressStore();
  const lang = settings.language;
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const terms = query ? searchTerms(query) : TERMINOLOGY;

  const cycleMastery = (key: string) => {
    const current = terminologyMastery[key] ?? 'unknown';
    const order: TermMastery[] = ['unknown', 'learning', 'understood', 'mastered'];
    const next = order[(order.indexOf(current) + 1) % order.length];
    updateTermMastery(key, next);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{t('dictionary', lang)}</h1>
        <p className="text-text-secondary mt-1">Professional developer terminology with ERP context</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          className="input-field pl-10"
          placeholder={t('searchTerms', lang)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {terms.map((term) => {
          const mastery = terminologyMastery[term.key] ?? 'unknown';
          const isExpanded = expanded === term.key;

          return (
            <div key={term.key} className="card">
              <button
                onClick={() => setExpanded(isExpanded ? null : term.key)}
                className="w-full flex items-center justify-between text-left"
              >
                <div>
                  <span className="font-semibold text-text-primary">{term.term}</span>
                  <span className="text-xs text-text-muted ml-2">{term.category}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); cycleMastery(term.key); }}
                  className={`badge ${MASTERY_COLORS[mastery]} capitalize`}
                >
                  {mastery}
                </button>
              </button>

              {isExpanded && (
                <div className="mt-4 space-y-3 text-sm border-t border-border pt-4">
                  <Block label="Simple Meaning" text={term.simpleMeaning} />
                  <Block label="Professional Definition" text={term.professionalDefinition} />
                  <Block label="Example" text={term.example} />
                  <Block label="ERP Example" text={term.erpExample} />
                  {term.odooExample && <Block label="Odoo Connection" text={term.odooExample} />}
                  <div>
                    <span className="content-label">Related Terms</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {term.relatedTerms.map((rt) => (
                        <span key={rt} className="badge bg-surface-hover text-text-secondary">{rt}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <span className="content-label">{label}</span>
      <p className="text-text-secondary mt-1">{text}</p>
    </div>
  );
}
