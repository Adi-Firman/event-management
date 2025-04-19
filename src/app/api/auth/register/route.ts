import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, name, referral, role } = body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const referralCode = uuidv4().slice(0, 6).toUpperCase(); // generate referral unik

  // Cek apakah referral valid
  let referrer = null;
  if (referral) {
    referrer = await prisma.user.findFirst({ where: { referralCode: referral } });
    if (!referrer) {
      return NextResponse.json({ error: "Referral tidak valid" }, { status: 400 });
    }
  }

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: role === "ORGANIZER" ? "ORGANIZER" : "CUSTOMER",
      referralCode,
    },
  });

  // Kalau referral valid, kasih kupon & poin
  if (referrer) {
    await prisma.$transaction([
      // referrer dapat 10.000 poin
      prisma.point.create({
        data: {
          userId: referrer.id,
          discount: 10000,
          expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 bulan
        },
      }),
      // user baru dapat kupon
      prisma.coupon.create({
        data: {
          userId: user.id,
          code: `WELCOME-${referralCode}`,
          value: 10000, // Replace 'value' with the correct property name from your Prisma schema
          expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        },
      }),
    ]);
  }

  return NextResponse.json({ message: "User created", user });
}
