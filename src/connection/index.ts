import { createConnection } from "typeorm";
import { getConfig } from "./datasource.config";
const main = async () => {
  await createConnection(getConfig())
    .then(async (e) => {
      e.runMigrations();
      console.log(`successful find to database `);
    })
    .catch((err) => {
      console.log(err);
    });
};
main();

console.log(`Successfull connection`);
