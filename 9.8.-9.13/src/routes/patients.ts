import express from "express";
const patientsRouter = express.Router();

// Services
import patientServices from "../services/patientServices";

patientsRouter.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Missing id.");

    const patient = patientServices.getPatientById(id);
    res.json(patient);

  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientsRouter.get("/", (_req, res) => {
  res.send(patientServices.getNonSensitivePatients());
});

patientsRouter.post("/", (req, res) => {
  try {
    const newPatient = patientServices.createNewPatient(req.body);
    res.json(newPatient);

  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientsRouter;