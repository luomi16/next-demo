"use client"

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed) {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        });
        if(res.ok) {
            console.log("Post deleted.");
            toast.success("Post deleted successfully.");
            router.refresh();
        }
      } catch (error) {
        toast.error("Something weng wrong.")
        console.log(error);
      }
    }
  };

  return (
    <div>
      <button onClick={handleDelete} className="text-red-600">
        delete
      </button>
    </div>
  );
}
