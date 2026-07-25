import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { Roadmap } from '@/pages/Roadmap';
import { Assessment } from '@/pages/Assessment';
import { DayPage } from '@/pages/DayPage';
import { Playground } from '@/pages/Playground';
import { SQLPlaygroundPage } from '@/pages/SQLPlaygroundPage';
import { ScoresPage } from '@/pages/ScoresPage';
import { DictionaryPage } from '@/pages/DictionaryPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { HowCodeWorks } from '@/pages/HowCodeWorks';
import { LanguageComparison } from '@/pages/LanguageComparison';
import { useProgressStore } from '@/store/useProgress';
import { ProgramSwitcherFab } from '@/programs/ProgramSwitcherFab';

function AssessmentGate({ children }: { children: React.ReactNode }) {
  const assessmentCompleted = useProgressStore((s) => s.assessmentCompleted);
  if (!assessmentCompleted) return <Navigate to="/assessment" replace />;
  return <>{children}</>;
}

/** Original ERP Developer Mastery Academy routes — curriculum and pages unchanged. */
export function ErpApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="assessment" element={<Assessment />} />
          <Route path="roadmap" element={<AssessmentGate><Roadmap /></AssessmentGate>} />
          <Route path="day/:dayNumber/*" element={<AssessmentGate><DayPage /></AssessmentGate>} />
          <Route path="playground/code" element={<AssessmentGate><Playground /></AssessmentGate>} />
          <Route path="playground/sql" element={<AssessmentGate><SQLPlaygroundPage /></AssessmentGate>} />
          <Route path="scores" element={<AssessmentGate><ScoresPage /></AssessmentGate>} />
          <Route path="dictionary" element={<AssessmentGate><DictionaryPage /></AssessmentGate>} />
          <Route path="labs/how-code-works" element={<AssessmentGate><HowCodeWorks /></AssessmentGate>} />
          <Route path="labs/language-comparison" element={<AssessmentGate><LanguageComparison /></AssessmentGate>} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <ProgramSwitcherFab />
    </>
  );
}
