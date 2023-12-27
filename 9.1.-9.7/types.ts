// types used on bmiCalculator.ts
export interface ParsedValues {
  height: number;
  weight: number;
}

// types used on exerciseCalculator.ts
export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface RatingResult {
  rating: number;
  ratingDescription: string;
}

export interface ParsedValuesForExercises {
  days: number[];
  target: number;
}