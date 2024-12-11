import { envConfig } from "@/config";
import { LoginSchema } from "@/schema";
import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validatedValues = LoginSchema.safeParse(body);
  if (!validatedValues.success) {
    const errors = validatedValues.error.errors
      .map((err) => err.message)
      .join(", ");
    return Response.json({ message: errors }, { status: 500 });
  }
  const { email, password } = validatedValues.data;
  try {
    const response = await axios.post(
      `${envConfig.apiUrl}/users/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );
    return Response.json(response.data);
  } catch (error: any) {
    return Response.json(
      { message: error.response?.data?.message || "Something went wrong" },
      { status: error.response?.status || 500 }
    );
  }
}
