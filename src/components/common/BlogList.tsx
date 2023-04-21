import React from "react";

import Image from "next/image";
import dayjs from "dayjs";

interface AuthorProps {
  image?: string | null;
  name: string | null;
}

interface PostProps {
  author: AuthorProps;
  description: string;
  title: string;
  createdAt: Date;
}

interface BlogProps {
  post: PostProps;
}

const BlogList = ({ post }: BlogProps) => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex">
        <div className="relative h-8 w-8 rounded-full bg-gray-500">
          <Image
            src={post.author.image!}
            alt="Profile image"
            fill
            className="rounded-full"
          />
        </div>
        <div className="ml-2">
          <p className="text-xs">
            <span className="font-semibold">{post.author.name}</span> &#x2022;{" "}
            <span className="text-gray-500">
              {dayjs(post.createdAt).format("MMM D, YYYY h:mm A")}
            </span>
          </p>
          <p className="text-xs text-gray-500">
            Father, Founder, teacher and software developer
          </p>
        </div>
      </div>
      <div className="group grid min-h-[6rem] w-full grid-cols-12 gap-3">
        <div className="col-span-8">
          <p className="text-2sm font-bold group-hover:underline">
            {post.title}
          </p>
          <p className="pt-3 text-xs text-gray-600">{post.description}</p>
        </div>
        {/* Image */}
        <div className="col-span-4">
          <div className="h-full w-full transform rounded-xl bg-gray-300 transition duration-300 hover:scale-105 hover:shadow-xl"></div>
        </div>
      </div>
      <div className="relative flex w-full items-center space-x-4 border-b border-gray-300 pb-8">
        <div className="text-xs">My topics</div>
        <div className="flex items-center space-x-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="rounded-2xl bg-gray-200 px-4 py-2 text-xs" key={i}>
              tag{i}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
