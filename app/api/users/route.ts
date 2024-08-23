import { NextRequest, NextResponse } from "next/server";
import serverAuth from "@/app/libs/serverAuth";
import prisma from "@/app/libs/prismadb";
export async function GET(req: any) {
  try {
    const currentUser = await serverAuth();

    const users = await prisma?.user.findMany({
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 400 });
  }
}
