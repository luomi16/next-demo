import { TPost } from "@/app/page";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Post from "@/components/Post";

const getPost = async (id: string): Promise<TPost | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const post = await res.json();
      return post;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default async function PostPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("sign-in");

  const id = params.id;

  const post = await getPost(id);

  return (
    <>
      {post ? (
        <Post
          key={post.id}
          id={post.id}
          author={""}
          authorEmail={post.authorEmail}
          date={post.createdAt}
          title={post.title}
          thumbnail={post.imageUrl}
          category={post.catName}
          content={post.content}
          links={post.links || []}
        />
      ) : (
        <div>Invalid Post</div>
      )}
    </>
  );
}
