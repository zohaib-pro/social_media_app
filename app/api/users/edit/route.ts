import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getQuery } from "@/app/utils/server";
import serverAuth from "@/app/libs/serverAuth";
import { User } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const currentUser = await serverAuth();
    if (!currentUser) {
      return NextResponse.json(
        { error: "User not authenticated!" },
        { status: 401 }
      );
    }

    const { name, profileImage, coverImage } = await request.json();
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { name, profileImage, coverImage },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
