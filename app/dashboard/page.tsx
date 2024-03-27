import Post from "@/components/Post";
import { postsData } from "@/data";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if(!session) redirect("sign-in");
  return (
    <div>
      <h1>My posts</h1>
      {postsData && postsData.length > 0 ? (
        postsData.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author}
            authorEmail={"test@example.com"}
            date={post.datepublished}
            title={post.title}
            thumbnail={post.thumbnail}
            category={post.category}
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
