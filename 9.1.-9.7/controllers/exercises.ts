import { Request, Response } from "express";
import calculateExercises from "../exerciseCalculator";

const exercisesController = (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body || {};

    if (!daily_exercises || !target) throw new Error("Parameters missing");

    if (
      !Array.isArray(daily_exercises) ||
      daily_exercises.some(e => isNaN(Number(e)))
    ) throw new Error("Malformatted parameters");

    const days: number[] = daily_exercises.map(e => Number(e));

    const result = calculateExercises(days, Number(target));
    return res.send(result);

  } catch (error) {
    let errorMessage = 'Something bad happened. ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.send({ error: errorMessage });
  }
};

export default exercisesController;