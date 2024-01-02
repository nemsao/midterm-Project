declare module "express";
declare module "express-session";
import express from "express";
import session from "express-session";
import { env } from "./interface.env";
import cors from "cors";
import { router } from "./route";

const app = express();
app.use(
  session({
    secret: env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.listen(env.PORT, () => {
  console.log("On port", env.PORT);
});
