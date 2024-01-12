import dotenv from "dotenv";
import { DataSourceOptions } from "typeorm";
import { env } from "../interface.env";

dotenv.config();

export function getConfig() {
  return {
    type: "postgres",
    host: env.HOST,
    port: env.PORT_DATA,
    username: env.USERNAME,
    password: env.PASSWORD,
    database: env.DATABASE,
    synchronize: false,
    entities: ["src/**/*.class{.ts,.js}"],
    migrations: ["src/migrations/*{.ts,.js}"],
  } as DataSourceOptions;
}
