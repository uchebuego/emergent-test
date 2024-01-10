import "dotenv/config";
import express from "express";
import AppDataSource from "./database/app-data-source";
import apiRouter from "./routes/api";

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

app.use(apiRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
