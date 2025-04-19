import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 jam

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: expires,
    },
  });

  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  await sendEmail({
    to: user.email,
    subject: "Reset Password",
    html: `<p>Klik link berikut untuk reset password:</p><a href="${resetLink}">${resetLink}</a>`,
  });

  return NextResponse.json({ message: "Reset link sent" });
}
