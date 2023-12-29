import { Gender, Patient } from "./types";
import { randomUUID } from "crypto";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseToString = (param: unknown): string => {
  if (!isString(param)) {
    throw new Error(`Invalid ${[param]} type: ${param}`);
  }
  return param;
};

const parseToDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error(`Invalid date type: ${date}`);
  }
  return date;
};

const parseToGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error(`Invalid gender type: ${gender}`);
  }
  return gender;
};

const parseOrCreateId = (id: unknown): string => {
  if (!id) {
    const newId: string = randomUUID();
    return newId;
  }
  if (!isString(id)) throw new Error("Invalid id type.");
  return id;
};

const parseNewPatient = (patient: unknown): Patient => {
  if (!patient || typeof patient !== 'object') {
    throw new Error('Incorrect or missing data.');
  }

  if (
    "name" in patient &&
    "dateOfBirth" in patient &&
    "ssn" in patient &&
    "gender" in patient &&
    "occupation" in patient
  ) {
    const id = ("id" in patient) ? patient.id : undefined;

    const newPatient: Patient = {
      name: parseToString(patient.name),
      dateOfBirth: parseToDate(patient.dateOfBirth),
      ssn: parseToString(patient.ssn),
      gender: parseToGender(patient.gender),
      occupation: parseToString(patient.occupation),
      id: parseOrCreateId(id),
    };

    return newPatient;
  }

  throw new Error("Incorrect data: some fields are missing.");
};

export default parseNewPatient;