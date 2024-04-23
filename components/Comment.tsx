import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TPost } from "@/app/page";
import { TComment } from "@/app/post/[id]/page";

interface CommentProps {
  id: string;
  content: string;
  likeNum: number;
  quote?: string;
  createdAt: string;
  authorId: string;
  authorEmail: string;
}

export default async function Comment({
  id,
  content,
  authorEmail,
  likeNum,
  quote,
  createdAt,
  authorId,
}: CommentProps) {
  const dataObject = new Date(createdAt);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const formatttedDate = dataObject.toLocaleDateString("en-US", options);

  return (
    <div key={id} className="mb-2 p-2">
      <div className="flex my-2">
        {authorEmail ? (
          <p className="text-lg font-semibold">{authorEmail}</p>
        ) : (
          <p className="text-lg font-semibold">An anonymous user</p>
        )}
        <p className="text-xs text-gray-400 ml-4 mt-1.5">{formatttedDate}</p>
      </div>
      {quote && (
        <p className="flex items-start space-x-2">
          <svg
            className="mr-2 mt-1"
            width="16"
            height="13"
            viewBox="0 0 16 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.8252 0.120117C12.5586 0.120117 13.1586 0.270117 13.6252 0.570117C14.0919 0.870117 14.4752 1.25345 14.7752 1.72012C15.1419 2.25345 15.3752 2.83679 15.4752 3.47012C15.5752 4.10345 15.6252 4.62012 15.6252 5.02012C15.6252 6.65345 15.2086 8.13679 14.3752 9.47012C13.5419 10.8035 12.2419 11.8868 10.4752 12.7201L10.0252 11.8201C11.0586 11.3868 11.9419 10.7035 12.6752 9.77012C13.4419 8.83678 13.8252 7.88679 13.8252 6.92012C13.8252 6.52012 13.7752 6.17012 13.6752 5.87012C13.1419 6.30345 12.5252 6.52012 11.8252 6.52012C10.9586 6.52012 10.2086 6.23679 9.57524 5.67012C8.94191 5.10345 8.62524 4.32012 8.62524 3.32012C8.62524 2.38678 8.94191 1.62012 9.57524 1.02012C10.2086 0.420117 10.9586 0.120117 11.8252 0.120117ZM3.32524 0.120117C4.05858 0.120117 4.65858 0.270117 5.12524 0.570117C5.59191 0.870117 5.97524 1.25345 6.27524 1.72012C6.64191 2.25345 6.87524 2.83679 6.97524 3.47012C7.07524 4.10345 7.12524 4.62012 7.12524 5.02012C7.12524 6.65345 6.70858 8.13679 5.87524 9.47012C5.04191 10.8035 3.74191 11.8868 1.97524 12.7201L1.52524 11.8201C2.55858 11.3868 3.44191 10.7035 4.17524 9.77012C4.94191 8.83678 5.32524 7.88679 5.32524 6.92012C5.32524 6.52012 5.27524 6.17012 5.17524 5.87012C4.64191 6.30345 4.02524 6.52012 3.32524 6.52012C2.45858 6.52012 1.70858 6.23679 1.07524 5.67012C0.441911 5.10345 0.125244 4.32012 0.125244 3.32012C0.125244 2.38678 0.441911 1.62012 1.07524 1.02012C1.70858 0.420117 2.45858 0.120117 3.32524 0.120117Z"
              fill="#312480"
            />
          </svg>
          <span className="bg-[#cfbedb] text-gray-700 text-base p-1 inline-block leading-tight">
            {quote}
          </span>
        </p>
      )}
      <div className="text-[#11151C] text-sm my-2 p-1">{content}</div>

      <div className="flex justify-between">
        <div className="flex">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5494 9.70811L8.73692 2.47073L16.2249 9.90713L9.03737 17.1445L1.5494 9.70811Z"
              fill="#9F9F9F"
            />
            <path
              d="M10.2 6.01992C10.2 8.83657 7.91665 11.1199 5.1 11.1199C2.28335 11.1199 0 8.83657 0 6.01992C0 3.20327 2.28335 0.919922 5.1 0.919922C7.91665 0.919922 10.2 3.20327 10.2 6.01992Z"
              fill="#9F9F9F"
            />
            <path
              d="M18.0001 6.01992C18.0001 8.83657 15.7167 11.1199 12.9001 11.1199C10.0834 11.1199 7.80007 8.83657 7.80007 6.01992C7.80007 3.20327 10.0834 0.919922 12.9001 0.919922C15.7167 0.919922 18.0001 3.20327 18.0001 6.01992Z"
              fill="#9F9F9F"
            />
          </svg>

          <div className="mx-2 mb-2 mr-6 text-[#9F9F9F]">{likeNum}</div>
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.0378 8.96218C17.533 9.36242 17.533 10.1174 17.0378 10.5176L10.1787 16.0618C9.52471 16.5904 8.55003 16.1249 8.55003 15.2841L8.55003 4.19568C8.55003 3.35483 9.52471 2.8894 10.1787 3.41797L17.0378 8.96218Z"
              fill="#9F9F9F"
            />
            <path
              d="M9.18003 6.58984L10.08 12.2598L6.03004 12.8898L4.53391 13.2639C3.85877 13.4326 3.2263 13.7405 2.67697 14.1677L1.88999 14.7798L-6.67572e-06 16.6698L0.862824 12.8265C0.947361 12.45 1.07521 12.0845 1.24381 11.7374L1.81455 10.5623C2.27318 9.61799 3.01738 8.84201 3.94166 8.34433L5.37248 7.57391C5.80843 7.33917 6.27684 7.17048 6.76236 7.07338L9.18003 6.58984Z"
              fill="#9F9F9F"
            />
          </svg>
          <div className="mx-2 mb-2 text-[#9F9F9F]">Share</div>
        </div>
      </div>
    </div>
  );
}
