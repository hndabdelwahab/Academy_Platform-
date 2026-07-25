import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ProgramId = 'erp' | 'po';

interface ProgramStore {
  selectedProgram: ProgramId | null;
  selectProgram: (program: ProgramId) => void;
  clearProgram: () => void;
}

/** Remembers which academy the learner is currently in (not learning progress). */
export const useProgramStore = create<ProgramStore>()(
  persist(
    (set) => ({
      selectedProgram: null,
      selectProgram: (program) => set({ selectedProgram: program }),
      clearProgram: () => set({ selectedProgram: null }),
    }),
    { name: 'academy-selected-program' },
  ),
);
