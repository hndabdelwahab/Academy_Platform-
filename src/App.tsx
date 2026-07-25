import { ProgramSelect } from '@/programs/ProgramSelect';
import { useProgramStore } from '@/programs/programStore';
import { ErpApp } from '@/erp/ErpApp';
import { PoApp } from '@/po/PoApp';

/**
 * Platform shell:
 * - No program selected → Choose Your Learning Program
 * - erp → original ERP Developer Mastery Academy (erp-academy-progress)
 * - po → Product Owner Mastery Academy (po-academy-progress)
 */
export default function App() {
  const selectedProgram = useProgramStore((s) => s.selectedProgram);

  if (!selectedProgram) {
    return <ProgramSelect />;
  }

  if (selectedProgram === 'po') {
    return <PoApp />;
  }

  return <ErpApp />;
}
