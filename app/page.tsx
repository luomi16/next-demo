import CategoriesList from "@/components/CategoriesList";
import Post from "@/components/Post";

export type TPost = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publicId?: string;
  catName?: string;
  links: null | string[];
  createdAt: string;
  authorEmail: string;
  author: {
    name: string;
  };
};

// Get all posts
const getPosts = async (): Promise<TPost[] | null> => {
  try {
    const res = await fetch(`http://localhost:3000/api/posts`, {
      cache: "no-store",
    });
    if (res.ok) {
      const posts = await res.json();
      return posts;
    } else {
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
  return null;
};

export default async function Home() {
  const posts = await getPosts();
  return (
    <>
      <CategoriesList />
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author.name}
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
        <div className="py-6">No posts</div>
      )}
    </>
  );
}
