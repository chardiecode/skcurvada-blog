import React, { Fragment, SetStateAction } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { HiXMark } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ClientDate from "~/components/common/ClientDate";

dayjs.extend(relativeTime);

type CommentSideBarProps = {
  showCommentSideBar: boolean;
  setShowCommentSideBar: React.Dispatch<SetStateAction<boolean>>;
  postId: string;
};

type CommentFormType = { text: string };

const CommentSideBar = ({
  showCommentSideBar,
  setShowCommentSideBar,
  postId,
}: CommentSideBarProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<CommentFormType>({
    resolver: zodResolver(
      z.object({
        text: z.string().min(3),
      })
    ),
  });

  const postRoute = api.useContext().post;

  const submitComment = api.post.comment.useMutation({
    onSuccess: () => {
      toast.success("You thoughts has been posted");
      postRoute.getComments.invalidate({
        postId,
      });
      reset();
    },
    onError: (error) => {
      toast.error("Something went wrong. " + error);
    },
  });

  // Get comments
  const getComments = api.post.getComments.useQuery({
    postId,
  });
  console.log(getComments?.data?.length);
  return (
    <Transition.Root show={showCommentSideBar} as={Fragment}>
      <Dialog as="div" onClose={() => setShowCommentSideBar(false)}>
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
                  <h2 className="text-lg font-medium">
                    {`Responses(${getComments?.data?.length})`}
                  </h2>
                  <div className="text-lg">
                    <HiXMark
                      strokeWidth={1}
                      className="cursor-pointer text-xl"
                      onClick={() => setShowCommentSideBar(false)}
                    />
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit((data) => {
                    submitComment.mutate({
                      ...data,
                      postId,
                    });
                  })}
                  className="mb-8 flex w-full flex-col items-end"
                >
                  <textarea
                    id="comment"
                    placeholder="What are you thoughts?"
                    className="h-full w-full rounded-md border border-gray-300 p-3 text-sm shadow-lg outline-none focus:border-gray-600"
                    cols={5}
                    rows={5}
                    {...register("text")}
                  />
                  {isValid && (
                    <button
                      type="submit"
                      className="mt-4 space-x-3 rounded border border-gray-200 bg-red-500 px-4 py-1 text-sm text-white transition hover:border-gray-900 hover:text-gray-900"
                    >
                      Comment
                    </button>
                  )}
                </form>
                {getComments.isSuccess && (
                  <div className="flex flex-col items-center justify-center space-y-6">
                    {getComments.data.map((comment, i) => (
                      <div
                        className="w-full space-y-2 border-b pb-4 last:border-none"
                        key={i}
                      >
                        <div className="flex">
                          <div className="relative h-8 w-8 rounded-full bg-gray-500"></div>
                          <div className="ml-2">
                            <div className="text-xs">
                              <div className="font-semibold">
                                {comment.user.name}
                              </div>{" "}
                              &#x2022;{" "}
                              <div className="font-bold text-gray-800">
                                <ClientDate localizeDate={comment.createdAt} />
                              </div>
                            </div>
                            <p className="text-xs text-gray-600">
                              Father, Founder, teacher and software developer
                            </p>
                          </div>
                        </div>
                        <div className="py-1.5 text-sm text-gray-800">
                          {comment.text}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CommentSideBar;
