import { RegisterSchema } from "@/schema";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { getUserByEmail, getUserByUserName } from "@/data/user";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validatedValues = RegisterSchema.safeParse(body);
  if (!validatedValues.success) {
    const errors = validatedValues.error.errors
      .map((err) => err.message)
      .join(", ");
    return Response.json({ message: errors }, { status: 400 });
  }
  const { email, username, password } = validatedValues.data;
  if (password.length < 8){
    return Response.json(
      {
        message: "Password must contain at least 8 characters",
      },
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userid = crypto.randomUUID();
  const existingEmail = await getUserByEmail(email);
  const existingUserName = await getUserByUserName(username)
  if (existingEmail) {
    return Response.json(
      {
        message: "Email already in use!",
      },
      { status: 409 }
    );
  }
  if (existingUserName) {
    return Response.json(
      {
        message: "Username already in use!",
      },
      { status: 409 }
    );
  }
  try {
    await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        userid,
      },
    });
    return Response.json({ message: "User created!" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
