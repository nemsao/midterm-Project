require("dotenv").config();

interface IEnvVariables {
  SECRET_KEY: string;
  PORT: string;
}
const env: IEnvVariables = {
  SECRET_KEY: process.env.SECRET_KEY!,
  PORT: process.env.PORT!,
};

export { env };
