import { getCookie } from "@/lib/actions/getCookie";
import { db } from "@/lib/db";
import { verifyToken } from "@/utils/token";

export async function GET() {
  const token = await getCookie();
  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  const user = verifyToken(token.value);
  if (!user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const events = await db.event.findMany({
      where: {
        userId : user.userId
      },
    });
    return Response.json(events, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return Response.json(
      { message: error.response?.data?.message || error.response },
      { status: error.response?.status || 500 }
    );
  }
}
