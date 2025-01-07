import { getCookie } from "@/actions/getCookie";
import { db } from "@/lib/db";
import { EventApiSchema } from "@/schema";
import { verifyToken } from "@/utils/token";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const token = await getCookie();
    let events;

    if (token?.value) {
      try {
        const user = verifyToken(token.value);
        events = await db.event.findMany({
          where: {
            NOT: { userId: user?.userId },
          },
        });
      } catch {
        // Token invalid/expired - show all events
        events = await db.event.findMany();
      }
    } else {
      // No token - show all events
      events = await db.event.findMany();
    }

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
    const token = await getCookie();
    if (!token) {
      return Response.json({ message: "Unauthorized!" }, { status: 401 });
    }
    const verifiedUser = verifyToken(token.value);
    if (!verifiedUser) {
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
        userId: verifiedUser.userId,
      },
    });
    console.log(eventCreated);
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
