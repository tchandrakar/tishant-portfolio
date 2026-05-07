export interface AtlasProblem {
  id: string;
  title: string;
  summary?: string;
  difficulty?: 'Medium' | 'Hard' | 'Very Hard' | string;
  categories: string[];
  tags?: string[];
  path: string;
}

export interface AtlasLesson {
  id: string;
  level: 'easy' | 'medium' | 'hard';
  order: number;
  title: string;
  summary?: string;
  minutes?: number;
  tags?: string[];
  relatedProblems?: string[];
  path: string;
}

export type AtlasRoute =
  | { name: 'home' }
  | { name: 'learn' }
  | { name: 'categories' }
  | { name: 'all' }
  | { name: 'about' }
  | { name: 'category'; arg: string }
  | { name: 'problem'; arg: string }
  | { name: 'lesson'; arg: string };

export interface AtlasProgress {
  completed: string[];
  lastLessonId: string | null;
}
