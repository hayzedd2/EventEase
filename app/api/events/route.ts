import { getCookies } from "@/actions/GetCookie";
import { envConfig } from "@/config";
import { useAuth } from "@/hooks/user/useAuth";
import { useUser } from "@/hooks/useUser";
import { db } from "@/lib/db";
import { EventApiSchema } from "@/schema";
import { EventResponse } from "@/types/type";
import axios from "axios";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const events = await db.event.findMany();
    return Response.json(events, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return Response.json(
      { message: error.response?.data?.message || error.response },
      { status: error.response?.status || 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { data } = useUser();
    if (!data) {
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
    const eventCreated = await db.event.create({
      data: {
        ...validatedData.data,
        userId: data.userId,
      },
    });
    console.log(eventCreated)
    return Response.json(
      { message: "Event created succesfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
