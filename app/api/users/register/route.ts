import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";

export async function POST(req: any) {
  try {
    const { email, password, name } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 12);

    const alreadyUser = await prisma.user.findUnique({where: {email}});
    if (alreadyUser){
      return NextResponse.json({message: "User already Exists!"}, {status: 409})
    }

    const user = await prisma.user.create({
      data: { email, hashedPassword, name },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 400 });
  }
}
