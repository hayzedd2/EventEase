"use server";
import { EventSchema } from "@/schema";
import axios from "axios";
import * as z from "zod";
import { getCookies } from "./GetCookie";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const CreateEvent = async (values: z.infer<typeof EventSchema>) => {
  const validatedValues = EventSchema.safeParse(values);
  if (!validatedValues.success) {
    console.log("Validation Errors:", validatedValues.error.errors);
    throw new Error(
      validatedValues.error.errors.map((err) => err.message).join(", ")
    );
  }
  const { name, description, startDate, startTime, location, category } =
    validatedValues.data;
  const token = await getCookies();
  if (!token) {
    throw new Error("Unauthorized!");
  }
  try {
    const response = await axios.post(
      `${apiUrl}/events`,
      { name, description, startDate, startTime, location, category },
      { headers: { Authorization: `Bearer ${token.value}` } }
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
