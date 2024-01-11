import "dotenv/config";
import express from "express";
import AppDataSource from "./database/app-data-source";
import apiRouter from "./routes/api";
import * as OpenApiValidator from "express-openapi-validator";

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to Database Successfully");
  })
  .catch((err) => {
    console.error("Error connecting to Database", err);
  });

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  OpenApiValidator.middleware({
    validateApiSpec: true,
    apiSpec: "api.yml",
  })
);

app.use(apiRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
