import express from "express";
const app = express();

// Routes import
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";

// Config
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Test endpoint
app.get("/api/ping", (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

// Endpoints
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});