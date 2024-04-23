import { cookies } from "next/headers";
import { promises as fs } from "fs";
import { IUser } from "@src/types/db/user";
import {
  IGetLoggedInUserResponse,
  ISearchIndividualUserByEmailReturn,
} from "@src/types/lib/user-handler";

export async function searchIndividualUserByEmail(
  email: string
): Promise<ISearchIndividualUserByEmailReturn> {
  return new Promise(async (resolve) => {
    const parseUsersData: IUser[] = JSON.parse(
      await fs.readFile(process.cwd() + "/public/db/user.db.json", "utf8")
    );
    const getUser = parseUsersData.find((user) => {
      return user.email == email;
    });
    if (getUser) {
      resolve({
        message: "",
        status: 202,
        payload: {
          user: getUser,
        },
      });
    } else {
      resolve({
        message: "",
        status: 404,
        payload: {
          user: null,
        },
      });
    }
  });
}

export async function getLoggedInUser(): Promise<IGetLoggedInUserResponse> {
  try {
    const cookiesStore = cookies();
    const getAuthToken = cookiesStore.get("auth");
    if (getAuthToken) {
      const { value: token } = getAuthToken;
      const getUserEmail = token;
      const { message, payload } = await searchIndividualUserByEmail(
        getUserEmail
      );

      if (payload.user) {
        return {
          message: message,
          status: 202,
          payload: {
            isLoggedIn: true,
            loggedInUser: payload.user,
          },
        };
      } else {
        return {
          message: message,
          status: 404,
          payload: {
            isLoggedIn: false,
            loggedInUser: null,
          },
        };
      }
    } else {
      return {
        message: "",
        status: 404,
        payload: {
          isLoggedIn: false,
          loggedInUser: null,
        },
      };
    }
  } catch (err) {
    return {
      message: "Some things went wrong",
      status: 404,
      payload: {
        isLoggedIn: false,
        loggedInUser: null,
      },
    };
  }
}

export async function getAllUsers(): Promise<IUser[] | null> {
  return new Promise(async (resolve) => {
    const parseUser: IUser[] = JSON.parse(
      await fs.readFile(process.cwd() + "/public/db/user.db.json", "utf8")
    );
    if (parseUser) {
      resolve(parseUser);
    } else {
      resolve(null);
    }
  });
}
