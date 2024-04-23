"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateComment({ postId }: { postId: string }) {
  const [content, setContent] = useState("");
  //   const [quote, setQuote] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  // console.log(postId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content) {
      setError("Content is required.");
      return;
    }

    try {
      const res = await fetch("/api/comments/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          content,
          postId,
        }),
      });
      if (res.ok) {
        router.push(`/post/${postId}`);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Failed to create comment.");
      }
    } catch (error) {
      setError("An error occurred while posting the comment.");
      console.error(error);
    }
  };

  return (
    <div>
      <p className="my-2 text-lg font-bold">Comment on this article</p>
      <form onSubmit={handleSubmit} className="flex flex-col relative">
        <input
          className="flex-1 bg-[#ECECEC] border-none rounded-lg"
          onChange={(e) => setContent(e.target.value)}
          type="text"
          placeholder="Add your comment here..."
        />
        <button
          className="absolute right-1 top-1 px-4 py-1 text-base text-[#9F9F9F] font-bold"
          type="submit"
        >
          Post
        </button>
        {error && <p className="p-2 text-red-500 font-bold">{error}</p>}
      </form>
      {/* <div className="mt-6 border-t-2 border-gray-200"></div> */}
    </div>
  );
}
