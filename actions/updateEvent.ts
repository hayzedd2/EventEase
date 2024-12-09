"use server";
import { EventSchema } from "@/schema";
import axios from "axios";
import * as z from "zod";
import { getCookies } from "./GetCookie";
import { envConfig } from "@/config";

export const UpdateEvent = async (
  values: z.infer<typeof EventSchema>,
  id: number
) => {
  const validatedValues = EventSchema.safeParse(values);
  if (!validatedValues.success) {
    const errors = validatedValues.error.errors.map(err => err.message).join(", ");
    throw new Error(`Error: ${errors}`);
  }
  const { name, description, startDate, startTime, location, category } =
    validatedValues.data;
  const token = await getCookies();
  if (!token) {
    throw new Error("Unauthorized!");
  }
  try {
    const response = await axios.put(
      `${envConfig.apiUrl}/events/${id}`,
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
