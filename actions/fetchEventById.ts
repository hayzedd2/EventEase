"use server";
import { EventResponse, Events } from "@/types/type";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const fetchEventById = async (id: number): Promise<EventResponse> => {
  try {
    const { data } = await axios.get<EventResponse>(
      `${apiUrl}/events/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
};
