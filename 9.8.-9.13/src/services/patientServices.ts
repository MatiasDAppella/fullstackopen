import patients from "../../data/patients";
import parseNewPatient from "../utils";
import { NonSensitivePatients, Patient } from "../types";

const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    })
  );
};

const createNewPatient = (data: unknown): Patient => {
  const newPatient = parseNewPatient(data);

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  createNewPatient,
};