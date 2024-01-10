import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import AppDataSource from "./database/app-data-source";

dotenv.config();

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
