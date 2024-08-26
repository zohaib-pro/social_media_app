import { NextRequest, NextResponse } from "next/server";
import serverAuth from "@/app/libs/serverAuth";
import prisma from "@/app/libs/prismadb";
export async function POST(req: any) {
  try {
    const currentUser = await serverAuth();

    const { postId, content } = await req.json();

    //const comment = {content, test: 'auto', currentUser}

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: currentUser?.id || 0,
        postId,
      },
      include: { author: true },
    });

    //comment.currentUser = currentUser;

    return NextResponse.json(comment, { status: 201 });
    //return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 400 });
  }
}
