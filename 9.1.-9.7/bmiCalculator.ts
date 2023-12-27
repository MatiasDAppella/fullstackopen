import { ParsedValues } from "./types";

const parseArguments = (args: string[]): ParsedValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateFunction = (height: number, weight: number) => {
  const heightParsedToMeters = height / 100;
  return weight / (heightParsedToMeters * heightParsedToMeters);
};

const calculateBmi = (height: number, weight:number): string => {
  const result = calculateFunction(height, weight);
  
  const logMessage: string =
      (result < 18.5) ? "Underweight"
    : (result < 24.9) ? "Normal (healthy weight)"
    : (result < 29.9) ? "Overweight"
    : (result < 34.9) ? "Obesity (Class I)"
    : (result < 39.9) ? "Obesity (Class II)"
    : "Obesity (Class III)";
  
  return logMessage;
};

function main(){
  try {
    const { height, weight } = parseArguments(process.argv);
    const logMessage = calculateBmi(height, weight);
  
    console.log(logMessage);
  
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}

if (require.main === module) main();
export default calculateBmi;