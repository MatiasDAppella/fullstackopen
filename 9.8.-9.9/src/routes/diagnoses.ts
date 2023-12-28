import express from "express";
const diagnosesRouter = express.Router();

// Services
import diagnoseServices from "../services/diagnoseServices";

diagnosesRouter.get("/", (_req, res) => {
  res.send(diagnoseServices.getDiagnoses());
});

export default diagnosesRouter;