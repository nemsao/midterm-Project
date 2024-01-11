require("dotenv").config();

interface IEnvVariables {
  SECRET_KEY: string;
  PORT: string;
  TYPE: string;
  HOST: string;
  PORT_DATA: number;
  USERNAME: string;
  PASSWORD: string;
  DATABASE: string;
}
const env: IEnvVariables = {
  SECRET_KEY: process.env.SECRET_KEY!,
  PORT: process.env.PORT!,
  TYPE: process.env.TYPE!,
  HOST: process.env.HOST!,
  PORT_DATA: +process.env.PORT_DATA!,
  USERNAME: process.env.USER!,
  PASSWORD: process.env.PASSWORD!,
  DATABASE: process.env.DATABASE!,
};

export { env };
