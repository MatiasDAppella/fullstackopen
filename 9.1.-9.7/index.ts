import express from "express";
const app = express();

// Controllers
import bmiController from "./controllers/bmi";
import exercisesController from "./controllers/exercises";

// Middlewares
app.use(express.json());

// Test enpoints
app.get("/ping", (_req, res) => res.send("pong"));
app.get("/hello", (_req, res) => res.send("Hello Full Stack!"));

// Endpoints
app.get("/bmi", bmiController);
app.post("/exercises", exercisesController);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});