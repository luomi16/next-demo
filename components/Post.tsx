import Image from 'next/image';
import Link from 'next/link';
import DeleteButton from './DeleteButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';

interface PostProps {
  id: string;
  author: string;
  date: string;
  thumbnail?: string;
  authorEmail: string;
  title: string;
  content: string;
  links?: string[];
  category?: string;
}

export default async function Post({
  id,
  author,
  date,
  thumbnail,
  authorEmail,
  title,
  content,
  links,
  category,
}: PostProps) {
  const session = await getServerSession(authOptions);
  const isEditable = session && session?.user?.email === authorEmail;
  const dataObject = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  const formatttedDate = dataObject.toLocaleDateString('en-US', options);

  return (
    <div className="my-4 border-b border-b-300 py-8">
      <div className="mb-4">
        {author ? (
          <>
            Posted by: <span className="font-bold">{author}</span> on{' '}
            {formatttedDate}
          </>
        ) : (
          <>Posted on {formatttedDate}</>
        )}
      </div>
      <div className="w-full h-72 relative">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover rounded-md object-center"
          />
        ) : (
          <Image
            src={
              'https://github.com/Godsont/Tech-News-Starter-Files/blob/main/public/thumbnail-placeholder.png?raw=true'
            }
            alt={title}
            fill
            className="object-cover rounded-md object-center"
          />
        )}
      </div>
      {category && (
        <Link
          className="bg-slate-800 w-fit text-white px-4 py-0.5 text-sm font-bold rounded-md mt-4 block"
          href={`${process.env.NEXTAUTH_URL}/categories/${category}`}
        >
          {category}
        </Link>
      )}
      <Link href={`${process.env.NEXTAUTH_URL}/post/${id}`}>
        <h2>{title}</h2>
      </Link>
      <p className="content">{content}</p>
      {links && (
        <div className="my-4 flex flex-col gap-3">
          {links.map((link, index) => (
            <div key={index} className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>
              <Link className="link" href={link}>
                {link}
              </Link>
            </div>
          ))}
        </div>
      )}
      {isEditable && (
        <div className="flex gap-3 font-bold rounded-md px-4 py-2 bg-slate-200 w-fit">
          <Link href={`/edit-post/${id}`}>Edit</Link>
          <DeleteButton id={id} />
        </div>
      )}
    </div>
  );
}
