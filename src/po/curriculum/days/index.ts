import type { DayCurriculum, DayProgress } from '@/po/types';
import { finalizeDay01 } from './day-01-ar';
import { day01 as day01Raw } from './day-01';
import { day02 } from './day-02';
import { day03 } from './day-03';
import { day04 } from './day-04';
import { day05 } from './day-05';
import { day06 } from './day-06';
import { day07 } from './day-07';
import { day08 } from './day-08';
import { day09 } from './day-09';
import { day10 } from './day-10';
import { day11 } from './day-11';
import { day12 } from './day-12';
import { day13 } from './day-13';
import { day14 } from './day-14';
import { day15 } from './day-15';
import { day16 } from './day-16';
import { day17 } from './day-17';
import { day18 } from './day-18';
import { day19 } from './day-19';
import { day20 } from './day-20';

const day01 = finalizeDay01(day01Raw);

const curriculumMap: Record<number, DayCurriculum> = {
  1: day01,
  2: day02,
  3: day03,
  4: day04,
  5: day05,
  6: day06,
  7: day07,
  8: day08,
  9: day09,
  10: day10,
  11: day11,
  12: day12,
  13: day13,
  14: day14,
  15: day15,
  16: day16,
  17: day17,
  18: day18,
  19: day19,
  20: day20,
};

export function getDayCurriculum(dayNumber: number): DayCurriculum | undefined {
  return curriculumMap[dayNumber];
}

/** A day counts as built when it has full structure and no placeholder markers. */
export function isDayFullyBuilt(dayNumber: number): boolean {
  const day = curriculumMap[dayNumber];
  if (!day) return false;
  const raw = JSON.stringify(day);
  return (
    day.sections.length >= 8 &&
    day.quiz.length >= 10 &&
    day.exam.length >= 5 &&
    !!day.artifactActivity?.modelArtifact &&
    !raw.includes('Coming Soon') &&
    !/\bTBD\b/.test(raw)
  );
}

export function getDayCompletionRequirements(
  curriculum: DayCurriculum,
  progress: DayProgress | undefined,
) {
  const completed = new Set(progress?.completedActivities ?? []);
  const sectionsDone = curriculum.sections.every((s) => progress?.sectionProgress?.[s.id]);
  const items = [
    { id: 'sections', label: 'Complete all lesson sections (active learning answers required)', done: !!sectionsDone },
    { id: 'guided', label: 'Complete guided exercise', done: completed.has(curriculum.guidedExercise.id) },
    { id: 'independent', label: 'Complete independent exercise', done: completed.has(curriculum.independentExercise.id) },
    { id: 'artifact', label: 'Submit day artifact', done: completed.has(curriculum.artifactActivity.id) || (progress?.artifactScore ?? 0) > 0 },
    { id: 'quiz', label: 'Complete daily quiz', done: completed.has(`quiz-${curriculum.dayNumber}`) || (progress?.quizScore ?? 0) > 0 },
    { id: 'exam', label: 'Complete daily exam', done: completed.has(`exam-${curriculum.dayNumber}`) || (progress?.examScore ?? 0) > 0 },
  ];
  return { items, allRequiredComplete: items.every((i) => i.done) };
}

export function getAllDays(): DayCurriculum[] {
  return Object.values(curriculumMap).sort((a, b) => a.dayNumber - b.dayNumber);
}
