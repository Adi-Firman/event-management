import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, image } = await req.json();

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name, image },
  });

  return NextResponse.json({ message: "Profile updated" });
}

useEffect(() => {
    if (!session) router.replace("/unauthorized");
  }, [session]);
  

  