import express from "express";
const patientsRouter = express.Router();

// Services
import patientServices from "../services/patientServices";

patientsRouter.get("/", (_req, res) => {
  res.send(patientServices.getNonSensitivePatients());
});

export default patientsRouter;