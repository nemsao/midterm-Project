import { env } from "../../interface.env";
import { people, memberOfprojects } from "../../model/user";
import { project as pj } from "../../model/project";
import * as jwt from 'jsonwebtoken'

const createUser = (
  invitedId: Record<string,string>,
  email: string,
  dateOfBirth: string
): Promise<people> => {
  const {username,project}=invitedId
  const newUser = new people("NV011",username, "new member", "123");
  newUser.email = email;
  newUser.dateOfBirth = new Date(dateOfBirth);
  newUser.project=new pj(project||"New Project")
  delete newUser.password
  return Promise.resolve(newUser);
};

const userLogin = (
  username: string,
  password: string
):Promise<people>  => {
  try {
     console.log(username)
    const foundUser = memberOfprojects.find((e) => e.name === username);
    
    if (!foundUser) {
      throw new Error( "khong có tên người dùng");
    } else {
      const token=jwt.sign({foundUser},env.SECRET_KEY)
      if (foundUser.passwordCompare(password)) {
          delete foundUser.password
          const returnInformation={...foundUser,token:token}
        return Promise.resolve(returnInformation);
      } else {
        throw new Error("sai mật khẩu");
      }
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

const authorizationService = async (token: string, username: string) => {
  try {
    const decodeToken = jwt.verify(token, env.SECRET_KEY);
    const user = decodeToken.toString();
    return user;
  } catch (err) {
    throw new Error("token không hợp lệ ");
  }
};
export { createUser, userLogin,authorizationService };
