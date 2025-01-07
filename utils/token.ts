import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY || "viola";

export const generateToken = (
  email: string,
  userName: string,
  userId: string
) => {
  const token = jwt.sign(
    {
      email,
      userName,
      userId,
    },
    secretKey,
    {
      expiresIn: "2h",
    }
  );
  return token;
};

export const verifyToken = (token: string): { userId: string } | null => {
  try {
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;

    // Extract userId from claims
    const userId = decoded.userId as string;

    if (!userId) {
      throw new Error("Invalid token claims");
    }

    return { userId };
  } catch (error: any) {
    console.error("Token verification failed:", error.message);
    return null;
  }
};
