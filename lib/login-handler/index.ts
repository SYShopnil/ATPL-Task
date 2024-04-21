import { IUser } from "@src/types/db/user";
import {
  ILoginController,
  ILoginControllerResponse,
} from "@src/types/lib/login-handler";

export async function LoginController({
  email,
  password,
}: ILoginController): Promise<ILoginControllerResponse> {
  try {
    const getAllUserResponse = await fetch("../../db/user.db.json");
    const allUser: IUser[] = await getAllUserResponse.json();

    const findUserByEmail = allUser.find(
      (user) => user.email == email && user.password == password
    );
    if (findUserByEmail) {
      return {
        message: `${findUserByEmail.userName} logged in successfully`,
        payload: {
          isLoggedIn: true,
          token: findUserByEmail.email,
        },
        status: 202,
      };
    } else {
      return {
        message: "User Not Found",
        payload: {
          isLoggedIn: false,
          token: "",
        },
        status: 404,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      message: "Some things went wrong",
      payload: {
        isLoggedIn: false,
        token: "",
      },
      status: 404,
    };
  }
}
