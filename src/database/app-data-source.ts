import "dotenv/config";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "mysql",
  logging: false,
  synchronize: false,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DB,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  entities: ["src/**/*.entity.ts"],
  migrations: ["src/database/migrations/**/*.ts"],
  port: process.env.MYSQL_PORT ? +process.env.MYSQL_PORT : 3306,
});

export default AppDataSource;
