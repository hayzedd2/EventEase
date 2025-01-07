"use server";
import { cookies } from "next/headers";

export const setCookie = async (token: string) => {
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 2);
  const cookie = await cookies();
  cookie.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    expires: expiryDate,
  });
};
