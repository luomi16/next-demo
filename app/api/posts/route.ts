import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  const { title, content, links, selectedCategory, imageUrl, publicId } =
    await req.json();

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required." },
      { status: 500 }
    );
  }
  try {
    const newPost = await prisma.post.create({
        data: {
            title, content, links, imageUrl, publicId, catName: selectedCategory, authorEmail
        }
    })
  } catch (error) {
    
  }
}
