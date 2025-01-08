import { setCookie } from "@/lib/actions/setCookie";
import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schema";
import { generateToken } from "@/utils/token";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedValues = LoginSchema.safeParse(body);
    if (!validatedValues.success) {
      const errors = validatedValues.error.errors
        .map((err) => err.message)
        .join(", ");
      return Response.json({ message: errors }, { status: 400 });
    }
    const { email, password } = validatedValues.data;
    const existingUser = await getUserByEmail(email.toLowerCase());
    if (!existingUser || !existingUser.email || !existingUser.password) {
      return Response.json(
        { message: "Email or password do not match" },
        { status: 401 }
      );
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }
    const token = generateToken(
      existingUser.email,
      existingUser.username,
      existingUser.userid
    );
    await setCookie(token)
    return Response.json(
      { message: "Login successful"},
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: "Something went wrong"}, { status: 500 });
  }
}
