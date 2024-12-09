"use server";

import axios from "axios";
import { getCookies } from "./GetCookie";
import { envConfig } from "@/config";
export const DeleteEvent = async (id: number) => {
  const token = await getCookies();
  if (!token) {
    throw new Error("Unauthorized!");
  }
  try {
    const response = await axios.delete(`${envConfig.apiUrl}/events/${id}`, {
      headers: { Authorization: `Bearer ${token.value}` },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong, please try again");
    }
  }
};
