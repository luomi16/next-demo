import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const authorId = "66050fa36dd1d631fa66fb6c";

  const authorEmail = session?.user?.email as string;
  // const authorId = session?.user?.id as string;

  if (!authorEmail || !authorId) {
    throw new Error("Required user information is missing.");
  }

  const { content, postId, quote } = await req.json();

  if (!content) {
    return NextResponse.json(
      { error: "Content are required." },
      { status: 500 }
    );
  }
  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorEmail,
        authorId,
        quote,
      },
    });
    console.log("New comment created");
    return NextResponse.json(newComment);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not create comment." });
  }
}

// Get all comments
// export async function GET(req: Request) {
//   try {
//     const comments = await prisma.comment.findMany({
//       include: { author: { select: { name: true } } },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//     return NextResponse.json(comments);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { message: "Some error occured" },
//       { status: 500 }
//     );
//   }
// }

// const postId = "6614ad554d91d9178dcb5c61"

// Get comments by postId
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const postId = url.searchParams.get("postId");

    if (!postId) {
      return new NextResponse(JSON.stringify({ error: "postId is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const comments = await prisma.comment.findMany({
      where: { postId: postId },
      // include: { author: { select: { name: true } } },
      include: { author: true },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(comments);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to fetch comments." },
      { status: 500 }
    );
  }
}
