import { getCookies } from "@/actions/GetCookie";
import { envConfig } from "@/config";
import { EventApiSchema } from "@/schema";
import { EventResponse } from "@/types/type";
import axios from "axios";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const { data } = await axios.get<EventResponse[]>(
      `${envConfig.apiUrl}/events`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      { message: error.response?.data?.message ||error },
      { status: error.response?.status || 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await getCookies();
    if (!token) {
      return Response.json({ message: "Unauthorized!" }, { status: 401 });
    }
    const reqBody = await req.json();

    const validatedData = EventApiSchema.safeParse(reqBody);
    if (!validatedData.success) {
      const errors = validatedData.error.errors
        .map((err) => err.message)
        .join(", ");
      return Response.json({ message: errors }, { status: 500 });
    }
    const response = await axios.post(
      `${envConfig.apiUrl}/events`,
      validatedData.data,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    return Response.json(response.data);
  } catch (error: any) {
    return Response.json(
      { message: error.response?.data?.message || error },
      { status: error.response?.status || 500 }
    );
  }
}


