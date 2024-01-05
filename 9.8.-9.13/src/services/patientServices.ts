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

const getPatientById = (id: string): Patient => {
  const patient = patients.find(p => p.id === id);

  if (!patient) throw new Error("Patient not found.");
  return patient;
};

export default {
  getNonSensitivePatients,
  createNewPatient,
  getPatientById,
};