import content from './muscle-content.json';

export type Muscle = {
  n: string;
  ex: string;
  m: string;
  mk: string;
  a: string;
  s: string[];
  t: string;
  alt: string;
};

export type MuscleRegion = { id: string; d: string };

const sourceRegions = content.regions as Record<'front' | 'back', [string, string][]>;

export const regions: Record<'front' | 'back', MuscleRegion[]> = {
  front: sourceRegions.front.map(([id, d]) => ({ id, d })),
  back: sourceRegions.back.map(([id, d]) => ({ id, d })),
};

export const muscles = content.muscles as Record<string, Muscle>;

export const muscleLabels: Record<string, string> = Object.fromEntries(
  Object.entries(muscles).map(([id, item]) => [id, item.n]),
);

export const equipmentImages: Record<string, string> = {
  chest: '/equipment-press.jpg',
  shoulders: '/equipment-dumbbells.jpg',
  biceps: '/equipment-cable.jpg',
  triceps: '/equipment-cable.jpg',
  forearms: '/equipment-dumbbells.jpg',
  back: '/equipment-cable.jpg',
  lower_back: '/equipment-back-extension.jpg',
  abs: '/equipment-cable.jpg',
  quads: '/equipment-hack-squat.jpg',
  hamstrings: '/equipment-leg.jpg',
  glutes: '/equipment-hip-thrust.jpg',
  calves: '/equipment-leg.jpg',
  traps: '/equipment-dumbbells.jpg',
  obliques: '/equipment-dumbbells.jpg',
  adductors: '/equipment-leg.jpg',
  rear_delts: '/equipment-pec-deck.jpg',
  tibialis: '/equipment-bodyweight.jpg',
  neck: '/equipment-bodyweight.jpg',
  mid_back: '/equipment-cable.jpg',
};

export const equipmentDescriptions: Record<string, string> = {
  chest: 'ضغط موجّه للصدر مع مقعد قابل للضبط',
  shoulders: 'دمبل خفيف ومدى حركة طبيعي',
  biceps: 'كيبل بمقبض منفرد ومقاومة ثابتة',
  triceps: 'بكرة عالية ومقبض مستقيم',
  forearms: 'دمبل خفيف مع إسناد الساعد',
  back: 'مقبض سحب منخفض ومسار مقاومة ثابت',
  lower_back: 'مسند مائل لتثبيت الورك والقدمين',
  abs: 'كيبل علوي بحبل للمقاومة التدريجية',
  quads: 'عربة مائلة ومنصة واسعة للقرفصاء',
  hamstrings: 'وسادة دوارة لثني الركبة',
  glutes: 'مسند ووسادة مخصصة لدفع الورك',
  calves: 'منصة رفع ثابتة مع وسادات للكتفين',
  traps: 'دمبلان للحركة الرأسية المتحكم بها',
  obliques: 'دمبل واحد لمقاومة الانحناء الجانبي',
  adductors: 'وسادات تضبطان مدى تقريب الفخذين',
  rear_delts: 'مقابض منفصلة لفتح الذراعين للخلف',
  tibialis: 'تدريب بوزن الجسم دون جهاز',
  neck: 'مقاومة اليد فقط، دون جهاز',
  mid_back: 'كيبل منخفض لسحب أفقي متوازن',
};
