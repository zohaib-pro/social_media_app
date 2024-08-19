import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";
//import { getUserByEmail } from "../../../libs/prismaClient";

export async function GET(request: NextRequest) {
  try {
    const email = new URL(request.url).pathname.split("/")[3]; // Extract email from URL
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
