import { getCookies } from "@/actions/GetCookie";
import { envConfig } from "@/config";
import { UserResponse } from "@/types/type";
import axios from "axios";


export const GET = async () => {
  const token = await getCookies();
  if (!token) {
    return Response.json({ message: "Unauthorized!" }, { status: 401 });
  }
  try {
    const { data } = await axios.get<UserResponse>(
      `${envConfig.apiUrl}/user/details`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
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
};
