"use server";
import { envConfig } from "@/config";
import { RegisterSchema } from "@/schema";
import axios, { AxiosError } from "axios";
import * as z from "zod";

interface RegisterResponse {
  message: string;
}
export const Register = async (
  values: z.infer<typeof RegisterSchema>
): Promise<RegisterResponse> => {
  const validatedValues = RegisterSchema.safeParse(values);
  if (!validatedValues.success) {
    throw new Error("Invalid credentials");
  }
  let { email, username, password } = validatedValues.data;
  email = email.toLowerCase()
  try {
    const response = await axios.post<RegisterResponse>(
      `${envConfig.apiUrl}/users/signup`,
      { email, username, password },
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
