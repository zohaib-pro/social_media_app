import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getQuery } from "@/app/utils/server";
import serverAuth from "@/app/libs/serverAuth";
import { NotAuthenticated } from "@/app/libs/Authenticator";

export async function GET(request: NextRequest) {
  try {
    const currentUser = await serverAuth();
    if (!currentUser) return NotAuthenticated();

    const notifications = await prisma.notification.findMany({
      where: { userId: currentUser.id },
    });

    if (!notifications) {
      return NextResponse.json([], { status: 404 });
    }

    return NextResponse.json(notifications);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}
