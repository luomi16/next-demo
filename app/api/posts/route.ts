import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { title, content, links, selectedCategory, imageUrl, publicId } =
    await req.json();

  const authorEmail = session?.user?.email as string;

  if (!title || !content) {
    return NextResponse.json(
      { error: 'Title and content are required.' },
      { status: 500 }
    );
  }
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        links,
        imageUrl,
        publicId,
        catName: selectedCategory,
        authorEmail,
      },
    });
    console.log('Post created');
    return NextResponse.json(newPost);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Could not create post.' });
  }
}

// export async function GET() {
//   try {
//     const posts = await prisma.post.findMany({
//       include: { author: { select: { name: true } } },
//       orderBy: {
//         createdAt: 'desc',
//       },
//     });
//     return NextResponse.json(posts);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { message: 'Some error occured' },
//       { status: 500 }
//     );
//   }
// }

export async function GET() {
  // const page = parseInt(req.query.page) || 1; // 从查询参数获取页码，默认为第一页
  const page = 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const posts = await prisma.post.findMany({
      take: limit,
      skip: skip,
      include: { author: { select: { name: true } } },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Some error occurred' }, { status: 500 });
  }
}

