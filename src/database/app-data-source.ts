import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "mysql",
  logging: true,
  synchronize: true,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DB,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  entities: ["dist/database/entity/*.entity.js"],
  port: process.env.MYSQL_PORT ? +process.env.MYSQL_PORT : 3306,
});

export default AppDataSource;
