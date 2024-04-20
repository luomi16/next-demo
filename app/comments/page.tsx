import CommentsSection from "@/components/CommentsSection";
import PostComment from "@/components/CommentsSection/postComment";

export default function CommentsPage() {

  return (
    <div>
      {/* <CommentsList /> */}
      <PostComment />
      <CommentsSection />
    </div>
  );
}
