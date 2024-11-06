"use server"
import { cookies } from "next/headers";

export const getCookies = async () => {
  const cookie = await cookies();
  const token = cookie.get("token");
  if (!token){
    return null;
  }
  return token
};
