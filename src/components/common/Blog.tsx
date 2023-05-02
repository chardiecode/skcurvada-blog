import React, { useCallback, useState } from "react";

import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import toast from "react-hot-toast";
import { RouterOutputs, api } from "~/utils/api";
import { BsBookmarkCheckFill, BsBookmarkDash } from "react-icons/bs";

import Avatar from "./user/Avatar";

// interface AuthorProps {
//   image?: string | null;
//   name: string | null;
// }

// interface BookmarkProps {
//   id: string;
//   userId: string;
//   postId: string;
// }

// interface PostProps {
//   id: string;
//   author: AuthorProps;
//   description: string;
//   title: string;
//   createdAt: Date;
//   slug: string;
//   bookmarks?: BookmarkProps[];
// }

// interface BlogProps {
//   post: PostProps;
// }

type BlogProps = RouterOutputs["post"]["getPosts"][number];

const Blog: React.FC<BlogProps> = ({ ...post }) => {
  // Save bookmarks on state to avoid rerendering
  const [isBookmarked, setIsBookmarked] = useState(
    Boolean(post.bookmarks?.length)
  );

  const bookmarkPost = api.post.bookmarkPost.useMutation({
    onSuccess: () => {
      setIsBookmarked((prev) => !prev);
      toast.success("Post has been added to your bookmark list");
    },
    onError() {
      toast.error("Something went wrong. Try again later");
    },
  });
  const unBookmarkPost = api.post.unBookmarkPost.useMutation({
    onSuccess: () => {
      setIsBookmarked((prev) => !prev);
      toast.success("Post has been unbookmarked");
    },
    onError() {
      toast.error("Something went wrong. Try again later");
    },
  });
  console.log(post);
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex">
        <div className="relative h-8 w-8 rounded-full bg-gray-500">
          <Avatar src={post?.author?.image! || ""} alt="Profile image" />
        </div>
        <div className="ml-2">
          <p className="text-xs">
            <Link
              href={`/user/${post.author.username}`}
              className="cursor-pointer font-semibold hover:underline"
            >
              {post.author.name}
            </Link>{" "}
            &#x2022;{" "}
            <span className="text-gray-500">
              {dayjs(post.createdAt).format("MMM D, YYYY h:mm A")}
            </span>
          </p>
          <p className="text-xs text-gray-500">
            Father, Founder, teacher and software developer
          </p>
        </div>
      </div>
      <Link
        href={`/${post.slug}`}
        className="group grid min-h-[6rem] w-full grid-cols-12 gap-3"
      >
        <div className="col-span-8">
          <p className="text-2sm line-clamp-2 font-bold group-hover:underline">
            {post.title}
          </p>
          <p className="line-clamp-3 pt-3 text-xs text-gray-600">
            {post.description}
          </p>
        </div>
        {/* Image */}
        <div className="col-span-4">
          <div className="h-full w-full transform rounded-xl bg-gray-300 transition duration-300 hover:scale-105 hover:shadow-xl"></div>
        </div>
      </Link>
      <div className="relative flex w-full items-center space-x-4 border-b border-gray-300 pb-8">
        <div className="flex w-full items-center space-x-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="rounded-2xl bg-gray-200 px-4 py-2 text-xs" key={i}>
              tag{i}
            </div>
          ))}
        </div>
        <div className="flex w-full items-center justify-end space-x-4 text-right">
          {isBookmarked ? (
            <BsBookmarkCheckFill
              onClick={() =>
                unBookmarkPost.mutate({
                  postId: post?.id,
                })
              }
              className="fill cursor-pointer text-xl text-red-500"
            />
          ) : (
            <BsBookmarkDash
              onClick={() =>
                bookmarkPost.mutate({
                  postId: post?.id,
                })
              }
              className="cursor-pointer text-xl"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
