import { useState } from 'react';
import { TERMINOLOGY, searchTerms } from '@/po/curriculum/terminology';
import { useProgressStore } from '@/po/store/useProgress';
import { t } from '@/po/i18n';
import type { TermMastery } from '@/po/types';
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
        <p className="text-text-secondary mt-1">
          {lang === 'ar'
            ? 'مصطلحات ملكية المنتج وأجايل وسكرم مع أمثلة ERP'
            : 'Product Ownership, Agile, and Scrum terminology with ERP examples'}
        </p>
      </div>

      <div className="relative">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          className="input-field ps-10"
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
                  <span className="font-semibold text-text-primary">
                    {lang === 'ar' ? `${term.termAr} (${term.term})` : term.term}
                  </span>
                  <span className="text-xs text-text-muted ms-2">{term.category}</span>
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
                  <Block label={lang === 'ar' ? 'معنى بسيط' : 'Simple Meaning'} text={lang === 'ar' ? term.simpleMeaningAr : term.simpleMeaning} />
                  <Block label={lang === 'ar' ? 'تعريف مهني' : 'Professional Definition'} text={term.professionalDefinition} />
                  <Block label={lang === 'ar' ? 'الغرض' : 'Purpose'} text={term.purpose} />
                  <Block label={lang === 'ar' ? 'دورة الحياة' : 'Lifecycle Location'} text={term.lifecycleLocation} />
                  <Block label={lang === 'ar' ? 'المسؤول' : 'Responsible Role'} text={term.responsibleRole} />
                  <Block label={lang === 'ar' ? 'المشاركون' : 'Participants'} text={term.participants} />
                  <Block label={lang === 'ar' ? 'المدخلات' : 'Inputs'} text={term.inputs} />
                  <Block label={lang === 'ar' ? 'المخرجات' : 'Outputs'} text={term.outputs} />
                  <Block label={lang === 'ar' ? 'مثال بسيط' : 'Simple Example'} text={term.example} />
                  <Block label={lang === 'ar' ? 'مثال برمجي' : 'Software Example'} text={term.softwareExample} />
                  <Block label={lang === 'ar' ? 'مثال ERP' : 'ERP Example'} text={term.erpExample} />
                  {term.confusedWith && <Block label={lang === 'ar' ? 'يُخلط غالباً مع' : 'Often Confused With'} text={term.confusedWith} />}
                  <Block label={lang === 'ar' ? 'استخدام خاطئ' : 'Incorrect Usage'} text={term.incorrectUsage} />
                  <Block label={lang === 'ar' ? 'استخدام صحيح' : 'Correct Usage'} text={term.correctUsage} />
                  <div>
                    <span className="content-label">{lang === 'ar' ? 'مصطلحات ذات صلة' : 'Related Terms'}</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {term.relatedTerms.map((rt) => (
                        <span key={rt} className="badge bg-surface-hover text-text-muted">{rt}</span>
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
      <p className="text-text-secondary mt-1 whitespace-pre-wrap">{text}</p>
    </div>
  );
}
