import { getCookie } from "@/actions/getCookie";
import { envConfig } from "@/config";
import { db } from "@/lib/db";
import { EventApiSchema } from "@/schema";
import { EventResponse } from "@/types/type";
import { verifyToken } from "@/utils/token";
import axios from "axios";
import { NextRequest } from "next/server";
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const token = await getCookie();
    const id = Number((await params).id);
    if (!token) {
      return Response.json({ message: "Unauthorized!" }, { status: 401 });
    }
    const user = verifyToken(token.value);
    if (!user) {
      return Response.json({ message: "Unauthorized!" }, { status: 401 });
    }

    // Verify event ownership
    const event = await db.event.findFirst({
      where: {
        id,
      },
    });
    console.log("reached");
    console.log("event", event);
    if (!event || event.userId !== user.userId) {
      return Response.json({ message: "Not allowed" }, { status: 403 });
    }

    await db.event.delete({
      where: { id },
    });

    return Response.json({ message: "Event deleted!" }, { status: 200 });
  } catch (error: any) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const token = await getCookie();
    const id = Number((await params).id);
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
    await db.event.update({
      where: {
        id,
      },
      data: {
        ...validatedData.data,
      },
    });

    return Response.json({ message: "Event updated!" }, { status: 200 });
  } catch (error: any) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const id = Number((await params).id);
    if (!id) {
      return Response.json(
        { message: "Event ID is required" },
        { status: 400 }
      );
    }
    const data = await db.event.findFirst({
      where: {
        id,
      },
    });
    return Response.json(data);
  } catch (error: any) {
    return Response.json({ message: "Something went wrong"  }, { status: 500 });
  }
}
