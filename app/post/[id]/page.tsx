import { TPost } from "@/app/page";
import Post from "@/components/Post";
import Comment from "@/components/Comment";

export type TComment = {
  id: string;
  content: string;
  likeNum: number;
  quote?: string;
  postId: string;
  post: TPost;
  parentCommentId?: string;
  parentComment?: TComment;
  replies: TComment[];
  createdAt: string;
  updatedAt: string;
  author: string;
};

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

// Get Comments by postId
const getComments = async (postId: string): Promise<TComment[] | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/comments/?postId=${postId}`,
      {
        cache: "no-store",
      }
    );
    if (res.ok) {
      const comments = await res.json();
      return comments;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default async function PostPage({
  params,
}: {
  params: { id: string; postId: string };
}) {
  const id = params.id;
  const post = await getPost(id);
  const comments = await getComments(id);

  return (
    <>
      {post ? (
        <>
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
          <h1>Comments</h1>
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                content={comment.content}
                likeNum={comment.likeNum}
                quote={comment.quote}
                createdAt={comment.createdAt}
                author={comment.author}
              />
            ))
          ) : (
            <div className="py-6">No comments yet. Be the first to comment!</div>
          )}
        </>
      ) : (
        <div>Invalid Post</div>
      )}
    </>
  );
}
