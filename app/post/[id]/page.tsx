import { TPost } from '@/app/page';
import Post from '@/components/Post';
import Comment from '@/components/Comment';
import CreateComment from '@/components/CreateComment';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import Dropdown from '@/components/Comments/dropdown';

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
  authorEmail: string;
};

const getPost = async (id: string): Promise<TPost | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
      cache: 'no-store',
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
        cache: 'no-store',
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
  const session = await getServerSession(authOptions);
  const isEditable = session;

  return (
    <>
      {post ? (
        <>
          <Post
            key={post.id}
            id={post.id}
            author={'Mi L'}
            authorEmail={post.authorEmail}
            date={post.createdAt}
            title={post.title}
            thumbnail={post.imageUrl}
            category={post.catName}
            content={post.content}
            links={post.links || []}
          />

          {isEditable && <CreateComment postId={post.id} />}

          <Dropdown />

          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                content={comment.content}
                likeNum={comment.likeNum}
                quote={comment.quote}
                createdAt={comment.createdAt}
                authorEmail={comment.authorEmail}
              />
            ))
          ) : (
            <div className="py-6">
              No comments yet. Be the first to comment!
            </div>
          )}
        </>
      ) : (
        <div>Invalid Post</div>
      )}
    </>
  );
}
