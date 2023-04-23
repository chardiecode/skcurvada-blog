"use client";
import { Fragment, useCallback, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { BsChat } from "react-icons/bs";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { HiXMark } from "react-icons/hi2";
import Image from "next/image";

import MainLayout from "~/layouts/MainLayout";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";

const BlogPage = () => {
  const [showComment, setShowComment] = useState(false);

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
      <Transition.Root show={showComment} as={Fragment}>
        <Dialog as="div" onClose={() => setShowComment(false)}>
          <div className="fixed right-0 top-0">
            <Transition.Child
              enter="transition duration-500"
              leave="transition duration-500"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative h-screen w-screen bg-white drop-shadow-2xl sm:w-[25rem]">
                <div className="flex h-full w-full flex-col overflow-auto px-5">
                  <div className="my-5 flex items-center justify-between ">
                    <h2 className="text-lg font-medium">Responses(4)</h2>
                    <div className="text-lg">
                      <HiXMark
                        strokeWidth={1}
                        className="cursor-pointer text-xl"
                        onClick={() => setShowComment(false)}
                      />
                    </div>
                  </div>
                  <form className="mb-8 flex w-full flex-col items-end">
                    <textarea
                      id="comment"
                      placeholder="What are you thoughts?"
                      className="h-full w-full rounded-md border border-gray-300 p-3 text-sm shadow-lg outline-none focus:border-gray-600"
                      cols={5}
                      rows={5}
                    />
                    <button
                      type="submit"
                      disabled
                      className="mt-4 space-x-3 rounded border border-gray-200 bg-red-500 px-4 py-1 text-sm text-white transition hover:border-gray-900 hover:text-gray-900"
                    >
                      Comment
                    </button>
                  </form>
                  <div className="flex flex-col items-center justify-center space-y-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        className="space-y-2 border-b pb-4 last:border-none"
                        key={i}
                      >
                        <div className="flex">
                          <div className="relative h-8 w-8 rounded-full bg-gray-500"></div>
                          <div className="ml-2">
                            <p className="text-xs">
                              <span className="font-semibold">
                                Chardie Coder
                              </span>{" "}
                              &#x2022;{" "}
                              <span className="font-bold text-gray-800">
                                2 hours ago
                              </span>
                            </p>
                            <p className="text-xs text-gray-600">
                              Father, Founder, teacher and software developer
                            </p>
                          </div>
                        </div>
                        <div className="pb-2 text-sm text-gray-600">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Iste quo excepturi debitis voluptate blanditiis
                          iure quasi aperiam sunt. Laudantium nam distinctio
                          quidem iusto eveniet amet in dolore repellat modi at!
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
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
            <div className="flex w-full">
              <div className="flex items-center justify-center rounded-lg bg-white">
                <div className="mr-4 flex h-full cursor-pointer">
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
                  <span className="ml-2 mt-2 text-xs font-bold">{`${getPost.data?._count.likes} likes`}</span>
                </div>
                <div className="cursor-pointer">
                  <BsChat
                    className="text-2xl"
                    onClick={() => setShowComment(true)}
                  />
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
