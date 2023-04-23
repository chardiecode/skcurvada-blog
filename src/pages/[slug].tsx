"use client";

import { useCallback, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { BsChat } from "react-icons/bs";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import Image from "next/image";

import MainLayout from "~/layouts/MainLayout";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import CommentSideBar from "~/components/common/CommentSidebar";

const BlogPage = () => {
  const [showCommentSideBar, setShowCommentSideBar] = useState(false);

  const router = useRouter();
  const getPost = api.post.getPost.useQuery(
    {
      slug: router.query.slug as string,
    },
    {
      enabled: !!router.query.slug, // Only get the post when slug is defined
    }
  );
  const postRoute = api.useContext().post;

  const invalidateCurrentPostPage = useCallback(() => {
    postRoute.getPost.invalidate({ slug: router.query.slug as string });
  }, [postRoute.getPost, router.query.slug]);

  const likePost = api.post.likePost.useMutation({
    onError() {
      toast.error("Please signin to like this post");
    },
    onSuccess: () => {
      invalidateCurrentPostPage();
    },
  });

  const dislikePost = api.post.disLikePost.useMutation({
    onSuccess: () => {
      invalidateCurrentPostPage();
    },
    onError() {
      toast.error("Something went wrong. Please try again later");
    },
  });

  const authorImage = getPost.data?.author.image;
  console.log(getPost);

  return (
    <MainLayout>
      <CommentSideBar
        showCommentSideBar={showCommentSideBar}
        setShowCommentSideBar={setShowCommentSideBar}
        postId={getPost.data?.id!}
      />
      <div className="flex h-full w-full flex-col items-center p-10">
        <div className="w-full max-w-screen-md flex-col space-y-4">
          {getPost.isLoading && <div>Loading...</div>}

          <div className="relative h-[40vh] w-full rounded-lg bg-gray-300 shadow-lg">
            <div className="absolute bottom-4 left-4 flex w-full items-center">
              {getPost.data?.title}
            </div>
          </div>
          <div className="flex pt-3">
            <div className="relative h-8 w-8 rounded-full bg-gray-500">
              {authorImage && (
                <Image
                  src={authorImage}
                  alt="Profile image"
                  fill
                  className="rounded-full"
                />
              )}
            </div>
            <div className="ml-2">
              <p className="text-xs">
                <span className="font-semibold">
                  {getPost.data?.author.name}
                </span>{" "}
                &#x2022;{" "}
                <span className="text-gray-500">
                  {dayjs(getPost.data?.createdAt).format("MMM D, YYYY h:mm A")}
                </span>
              </p>
              <p className="text-xs text-gray-500">
                Father, Founder, teacher and software developer
              </p>
            </div>
          </div>
          {getPost.isSuccess && (
            <div className="flex w-full py-2">
              <div className="flex items-center justify-center rounded-lg bg-white">
                <div className="mr-4 flex h-full cursor-pointer items-center">
                  {getPost.data?.likes?.length ? (
                    <FcLike
                      onClick={() =>
                        dislikePost.mutate({
                          postId: getPost.data?.id!,
                        })
                      }
                      className="text-3xl"
                    />
                  ) : (
                    <FcLikePlaceholder
                      onClick={() =>
                        likePost.mutate({
                          postId: getPost.data?.id!,
                        })
                      }
                      className="text-3xl"
                    />
                  )}
                  <span className="ml-2 text-xs font-bold">{`${getPost.data?._count.likes} likes`}</span>
                </div>
                <div
                  className="mx-3 flex h-full cursor-pointer items-center"
                  onClick={() => setShowCommentSideBar(true)}
                >
                  <BsChat className="text-2xl" />
                  <span className="ml-2 text-xs font-bold">{`${getPost.data?._count.comments} comments`}</span>
                </div>
              </div>
            </div>
          )}
          <div className="border-l-4 border-gray-700 pl-6">
            {getPost.data?.description}
          </div>
          <div>{getPost.data?.text}</div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogPage;
