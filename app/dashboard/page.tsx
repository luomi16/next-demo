import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
// import { Post } from "@prisma/client";
import { TPost } from "@/app/page";
import Post from "@/components/Post";

// Get posts by author
const getPosts = async (email: string) => { 
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}`);
    // destructure posts from res
    const {posts} = await res.json();
    return posts
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  let posts = [];

  if(!session) redirect("sign-in");

  if(email) {
    posts = await getPosts(email);
  }

  return (
    <div>
      <h1>My posts</h1>
      {posts && posts.length > 0 ? (
        posts.map((post: TPost) => (
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
        ))
      ) : (
        <div className="py-6">
          <div>No posts created yet.</div>
          <Link className="underline" href={"/create-post"}>Create New</Link>
        </div>
      )}
    </div>
  );
}
