"use server";

import { getCookies } from "@/actions/GetCookie";
import { envConfig } from "@/config";
import { User, UserResponse } from "@/types/type";
import axios from "axios";

export const getUserFromToken = async (): Promise<User> => {
  const token = await getCookies();
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const { data } = await axios.get<UserResponse>(
      `${envConfig.apiUrl}/user/details`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    return data.user;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
};
