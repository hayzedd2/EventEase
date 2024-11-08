"use server";
import { LoginSchema, RegisterSchema } from "@/schema";
import axios, { AxiosError } from "axios";
import * as z from "zod";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const Login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedValues = LoginSchema.safeParse(values);
  if (!validatedValues.success) {
    throw new Error("Invalid credentials");
  }
  let { email, password } = validatedValues.data;
  email = email.toLowerCase()
  try {
    const response = await axios.post(
      `${apiUrl}/users/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong, please try again");
    }
  }
};
