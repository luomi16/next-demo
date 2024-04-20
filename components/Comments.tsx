import { TPost } from "@/app/page";
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

export default async function Comments({
  params,
}: {
  params: { postId: string };
}) {
  const postId = params.postId;
  const comments = await getComments(postId);
  return (
    <>
      <div>comments</div>
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
        <div className="py-6">No comments</div>
      )}
    </>
  );
}
