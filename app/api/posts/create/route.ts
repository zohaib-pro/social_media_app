import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";

export async function POST(req: any) {
  try {

    //const currentUser = await serverAuth(req);

    const { content } = await req.json();

    const post = await prisma.post.create({
       data: {
        content, 
        authorId: 1,
       }
    });

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 400 });
  }
}
