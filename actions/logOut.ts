"use server";

import { cookies } from "next/headers"
export const logOut = async () => {
  const cookie = await cookies();
  cookie.delete("token");
  return true;
};
