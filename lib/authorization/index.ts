import { cookies } from "next/headers";
import { getLoggedInUser } from "../user-handler";

export async function Authorization(role: string[]) {
  const cookiesStore = cookies();
  const authToken = cookiesStore.get("auth");
  if (authToken) {
    const {
      payload: { loggedInUser },
    } = await getLoggedInUser();
    if (loggedInUser) {
      if (!role.includes(`${loggedInUser.userType}`)) {
        return false;
      }
    } else {
      return false;
    }
  }
}
