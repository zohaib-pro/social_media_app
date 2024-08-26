import { NextRequest, NextResponse } from "next/server";
import serverAuth from "@/app/libs/serverAuth";
import prisma from "@/app/libs/prismadb";
import { communicate } from "@/app/libs/SocketCommunicator";
import { NotAuthenticated } from "@/app/libs/Authenticator";
export async function POST(req: any) {
  try {
    const currentUser = await serverAuth();
    if (!currentUser) return NotAuthenticated();

    const { postId, content } = await req.json();

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: currentUser?.id || 0,
        postId,
      },
      include: { author: true },
    });

    //get whose post was liked
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { author: true },
    });

    if (post) {
      const newNotification = await prisma.notification.create({
        data: {
          userId: post.authorId,
          message: `${currentUser.name} commented on your post {${post.content}}`,
          type: "Comment",
        },
      });

      communicate("/notify", newNotification);
    }

    return NextResponse.json(comment, { status: 201 });
    //return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 400 });
  }
}
