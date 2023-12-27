import { Request, Response } from "express";
import calculateBmi from "../bmiCalculator";

const bmiController = (req: Request, res: Response) => {
  try {
    const { height, weight } = req.query || {};

    if (!height||!weight) throw new Error("Malformatted parameters");
    if (isNaN(Number(height)) || isNaN(Number(weight)))
      throw new Error('Provided values were not numbers!');

    const bmi = calculateBmi(Number(height), Number(weight));
    return res.send({
      height,
      weight,
      bmi,
    });

  } catch (error) {
    let errorMessage = 'Something bad happened. ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.send({ error: errorMessage });
  }
};

export default bmiController;