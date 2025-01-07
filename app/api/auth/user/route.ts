import { getCookie } from "@/actions/getCookie";
import { db } from "@/lib/db";
import { verifyToken } from "@/utils/token";

export const GET = async () => {
  try {
    const token = await getCookie();
    if (!token) {
      return Response.json({ message: "Unauthorized!" }, { status: 401 });
    }
    const verifiedUser = verifyToken(token.value);
    if (!verifiedUser) {
      return Response.json({ message: "Unauthorized!" }, { status: 401 });
    }
    const user = await db.user.findUnique({
      where: {
        userid: verifiedUser.userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        userid: true,
      },
    });
    return Response.json({ user }, { status: 200 });
  } catch (error: any) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
};
