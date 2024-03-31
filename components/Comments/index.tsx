"use client";

import { useState } from "react";

// Mock data for comments
const commentsData = [
  {
    id: 1,
    name: "Carl Zimmer",
    timestamp: "June 1, 2021 at 1:23 PM",
    content:
      "We are the driver. Nowadays we have humans putting fire on everything.",
  },
  {
    id: 2,
    name: "Edward Chen",
    timestamp: "June 1, 2021 at 1:23 PM",
    content:
      "They bury themselves under sand or mud to evade potential predators.",
  },
  // ... more comments
];

export default function Comments() {
  const [showComments, setShowComments] = useState(true);

  return (
    <div className="container mx-auto p-4">
      <button
        className="rounded border px-4 py-2 transition duration-300 hover:bg-gray-100"
        onClick={() => setShowComments(!showComments)}
      >
        {showComments ? "hide comments" : "show comments"}
      </button>

      {showComments && (
        <div>
          <div>
            <p className="my-2 text-lg font-bold">Comment on this article</p>
            <div className="flex flex-col relative">
              <input
                className="flex-1 bg-gray-100"
                type="text"
                placeholder="Add your comment here..."
              />
              <button
                className="absolute right-1 top-1 px-4 py-1 text-base text-stone-500 font-bold"
                type="button"
              >
                Post
              </button>
            </div>

            <div className="mt-6 border-t-2 border-gray-200"></div>
          </div>
          <div>
            <div className="mt-4">
            {commentsData ? (commentsData.map((comment) => (
              <div
                key={comment.id}
                className="mb-4 rounded-lg bg-white p-6 shadow-lg"
              >
                <div className="flex">
                  <p className="text-lg font-semibold">{comment.name}</p>
                  <p className="text-xs text-gray-400 ml-4 mt-1.5">
                    {comment.timestamp}
                  </p>
                </div>
                <p className="text-gray-600 bg-teal-500">{comment.content}</p>
              </div>
            ))): <p>No comments</p>}
          </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
