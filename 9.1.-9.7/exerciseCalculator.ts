import { Result, RatingResult, ParsedValuesForExercises } from "./types";

const calcAverage = (days: number[]): number => {
  const lng = days.length;
  const isLast = (i: number): boolean => (i === lng - 1);

  return days.reduce((acc, act, index) => {
    acc += act;
    return isLast(index) ? acc / lng : acc;
  }, 0);
};

const calcTrainingDays = (days: number[]): number => {
  return days.reduce((acc, act) => {
    if (act > 0) acc++;
    return acc;
  }, 0);
};

const calcRating = (average: number, target: number): RatingResult => {
  const description: string[] = [
    "",
    "need more dedication",
    "not too bad but could be better",
    "congrats! objective reached",
  ];

  const rating: number =
      (average < target / 2) ? 1
    : (average < target) ? 2
    : 3;

  return {
    rating,
    ratingDescription: description[rating]
  };
};

const calculateExercises = (days: number[], target: number): Result => {
  const average = calcAverage(days);
  const { rating, ratingDescription } = calcRating(average, target);
  
  return {
    periodLength: days.length,
    trainingDays: calcTrainingDays(days),
    success: (average >= target),
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArgumentsForExercises = (args: string[]): ParsedValuesForExercises => {
  const validated = (arg: string): number => {
    if (isNaN(Number(arg))) throw new Error('Provided values were not numbers!');
    return Number(arg);
  };

  if (args.length <= 4) throw new Error('Not enough arguments');
  const target = validated(args[2]);

  const days: number[] = [];
  for (let i = 3; i < args.length; i++) {
    days.push(validated(args[i]));
  }

  return {
    days,
    target,
  };
};

function main(){
  try {
    const { days, target } = parseArgumentsForExercises(process.argv);
    const logMessage = calculateExercises(days, target);
  
    console.log(logMessage);

  } catch (error: unknown) {
    let errorMessage = "Something goes wrong. ";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    console.log(errorMessage);
  }
}

if (require.main === module) main();
export default calculateExercises;