import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: any) {
  try {
    const { email, password, name } = await req.json();
    //const user = { email, password, name };
    const hashedPassword = await bcrypt.hash(password, 12);
    //const hashedPassword = password + "hashed";
    const user = await prisma.user.create({
      data: { email, hashedPassword, name },
    });

    //const user = { test: "hello" };
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.log(err);
    NextResponse.json(err, { status: 400 });
  }
}
