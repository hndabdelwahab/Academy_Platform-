import { ArrowLeftRight } from 'lucide-react';
import { useProgramStore } from '@/programs/programStore';

/** Floating control to return to program selection without clearing progress. */
export function ProgramSwitcherFab() {
  const clearProgram = useProgramStore((s) => s.clearProgram);
  const selected = useProgramStore((s) => s.selectedProgram);

  return (
    <button
      type="button"
      onClick={() => clearProgram()}
      className="fixed bottom-4 end-4 z-50 btn-secondary shadow-lg flex items-center gap-2 text-sm"
      title="Switch learning program"
    >
      <ArrowLeftRight className="w-4 h-4" />
      {selected === 'po' ? 'Switch Program' : 'Switch Program'}
    </button>
  );
}
