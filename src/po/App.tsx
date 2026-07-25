import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/po/components/layout/Layout';
import { Dashboard } from '@/po/pages/Dashboard';
import { Roadmap } from '@/po/pages/Roadmap';
import { Assessment } from '@/po/pages/Assessment';
import { DayPage } from '@/po/pages/DayPage';
import { ScoresPage } from '@/po/pages/ScoresPage';
import { DictionaryPage } from '@/po/pages/DictionaryPage';
import { SettingsPage } from '@/po/pages/SettingsPage';
import { HowScrumWorks } from '@/po/pages/HowScrumWorks';
import { useProgressStore } from '@/po/store/useProgress';

function AssessmentGate({ children }: { children: React.ReactNode }) {
  const assessmentCompleted = useProgressStore((s) => s.assessmentCompleted);
  if (!assessmentCompleted) return <Navigate to="/assessment" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="assessment" element={<Assessment />} />
        <Route path="roadmap" element={<AssessmentGate><Roadmap /></AssessmentGate>} />
        <Route path="day/:dayNumber/*" element={<AssessmentGate><DayPage /></AssessmentGate>} />
        <Route path="scores" element={<AssessmentGate><ScoresPage /></AssessmentGate>} />
        <Route path="dictionary" element={<AssessmentGate><DictionaryPage /></AssessmentGate>} />
        <Route path="labs/how-scrum-works" element={<AssessmentGate><HowScrumWorks /></AssessmentGate>} />
        <Route path="labs/how-code-works" element={<Navigate to="/labs/how-scrum-works" replace />} />
        <Route path="playground/*" element={<Navigate to="/dictionary" replace />} />
        <Route path="labs/language-comparison" element={<Navigate to="/dictionary" replace />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
