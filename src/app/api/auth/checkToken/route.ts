import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Mendapatkan token dari header Authorization
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No valid token found." });
  }

  // Lanjutkan dengan logika jika token valid
  res.status(200).json({ message: "Authenticated", user: token });
}
