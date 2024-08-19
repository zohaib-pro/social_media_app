import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";

export async function POST(req: any) {
  try {
    const { email, password, name } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, hashedPassword, name },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.log(err);
    NextResponse.json(err, { status: 400 });
  }
}
