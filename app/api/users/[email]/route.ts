import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";
import { getQuery } from "@/app/utils/server";

export async function GET(request: NextRequest) {
  try {
    const email = getQuery(request.url);
    if (!email) {
      return NextResponse.json(
        { error: "Email not provided" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
