import { NextRequest, NextResponse } from "next/server";
import serverAuth from "@/app/libs/serverAuth";
import prisma from "@/app/libs/prismadb";
import { communicate } from "@/app/libs/SocketCommunicator";
export async function POST(req: any) {
  try {
    const currentUser = await serverAuth();

    const { content, image } = await req.json();

    //const post = {content, test: 'auto', currentUser}

    const post = await prisma.post.create({
      data: {
        content,
        authorId: currentUser?.id || 0,
        image,
      },
      include: { author: true },
    });

    return NextResponse.json(post, { status: 201 });
    //return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 400 });
  }
}
