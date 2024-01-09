import { people, memberOfprojects } from "../../model/user";


const createUser = (
  username: string,
  password: string,
  email: string,
  dateOfBirth: string
): Promise<people> => {
  const newUser = new people(username, "new member", password);
  newUser.email = email;
  newUser.dateOfBirth = new Date(dateOfBirth);
  return Promise.resolve(newUser);
};

const userLogin = (
  username: string,
  password: string
):Promise<people>  => {
  try {
     console.log(username)
    const foundUser = memberOfprojects.find((e) => e.name === username);
    console.log(memberOfprojects.find((e) => e.name === username))
    if (!foundUser) {
      throw new Error( "khong có tên người dùng");
    } else {
     console.log(foundUser)
      if (foundUser.passwordCompare(password)) {
          delete foundUser.password
        return Promise.resolve(foundUser);
      } else {
        throw new Error("sai mật khẩu");
      }
    }
  } catch (err) {
    return Promise.reject(err);
  }
};


export { createUser, userLogin };
