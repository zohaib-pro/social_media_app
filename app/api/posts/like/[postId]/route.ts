import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { getQuery } from "@/app/utils/server";
import serverAuth from "@/app/libs/serverAuth";
import { communicate } from "@/app/libs/SocketCommunicator";
import { NotAuthenticated } from "@/app/libs/Authenticator";

export async function POST(request: NextRequest) {
  try {
    const currentUser = await serverAuth();
    if (!currentUser) return NotAuthenticated();

    const postId = getQuery(request.url);
    console.log(postId);
    if (!postId || !currentUser) {
      return NextResponse.json(
        { error: "Not Logged In or Invalid Post" },
        { status: 400 }
      );
    }

    const postIdInt = parseInt(postId);

    const existingLike = await prisma.like.findFirst({
      where: { postId: postIdInt, userId: currentUser.id },
    });

    if (existingLike) {
      // If the like exists, delete it (unlike)
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      return NextResponse.json(
        { postId: postIdInt, userId: currentUser.id, isLiked: false },
        { status: 202 }
      );
    } else {
      // If the like does not exist, create it (like)
      const newLike = await prisma.like.create({
        data: {
          postId: postIdInt,
          userId: currentUser.id,
        },
      });

      //get whose post was liked
      const post = await prisma.post.findUnique({
        where: { id: postIdInt },
        include: { author: true },
      });

      if (post) {
        const newNotification = await prisma.notification.create({
          data: {
            userId: post.authorId,
            message: `${currentUser.name} liked your post`,
            type: "Like",
          },
        });

        communicate("/notify", newNotification);
      }

      return NextResponse.json(newLike, { status: 201 });
    }

    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  } catch (error) {
    //return NextResponse.json(user);
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
