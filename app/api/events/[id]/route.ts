import { getCookie } from "@/actions/getCookie";
import { envConfig } from "@/config";
import { EventApiSchema } from "@/schema";
import { EventResponse } from "@/types/type";
import axios from "axios";
import { NextRequest } from "next/server";
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const token = await getCookie();
    const { id } = await params;
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
    const response = await axios.put(
      `${envConfig.apiUrl}/events/${id}`,
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
      { message: error.response?.data?.message || "Something went wrong" },
      { status: error.response?.status || 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const token = await getCookie();
    const { id } = await params;
    if (!token) {
      return Response.json({ message: "Unauthorized!" }, { status: 401 });
    }
    const response = await axios.delete(`${envConfig.apiUrl}/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    return Response.json(response.data);
  } catch (error: any) {
    return Response.json(
      { message: error.response?.data?.message || "Something went wrong" },
      { status: error.response?.status || 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  const paramsId = (await params).id
  console.log("here is", paramsId);
  if (!paramsId) {
    return Response.json({ message: "Event ID is required" }, { status: 400 });
  }
  try {
    const { data } = await axios.get<EventResponse[]>(
      `${envConfig.apiUrl}/events/${paramsId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      { message: error.response?.data?.message || "Something went wrong" },
      { status: error.response?.status || 500 }
    );
  }
}
