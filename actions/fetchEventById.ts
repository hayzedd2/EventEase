"use server";
import { envConfig } from "@/config";
import { EventResponse, Events } from "@/types/type";
import axios from "axios";


export const fetchEventById = async (id: number): Promise<EventResponse> => {
  try {
    const { data } = await axios.get<EventResponse>(
      `${envConfig.apiUrl}/events/${id}`,
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
