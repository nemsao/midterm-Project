declare module "bcrypt";
declare module "jsonwebtoken";
declare module "node-cache";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { env } from "../interface.env";
import nodeCache from "node-cache";

const myCache = new nodeCache();
class User {
  username: string;
  password: string;
  constructor(username: string, password: string) {
    this.username = username;
    this.password = bcrypt.hashSync(password, 10);
  }
}

const authenticate = async (
  username: string,
  password: string
): Promise<string> => {
  const Admin = new User("admin", "12345");

  if (username === Admin.username) {
    const equal = await bcrypt.compare(password, Admin.password);
    if (equal) {
      const token = await jwt.sign(username, env.SECRET_KEY);

      return Promise.resolve(token);
    } else {
      return Promise.reject("Sai mat khẩu");
    }
  } else {
    return Promise.reject("Không đúng tên admin");
  }
};

const authorizationService = async (token: string,username:string) => {
  try {
    const exists = myCache.has( username );
 
    console.log( exists );
    const decodeToken = jwt.verify(token, env.SECRET_KEY);
    const user = decodeToken.toString();
    return user;
  } catch (err) {
    throw new Error("token không hợp lệ ");
  }
};
const invalidThisToken = async (username: string, token: string) => {
  try {
    console.log(myCache.set(username, token, 100000))
     
  } catch (err) {
    throw new Error("Lỗi Invalid token")
  }
};

export { authenticate, authorizationService,invalidThisToken };
