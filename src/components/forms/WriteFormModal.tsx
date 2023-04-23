import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { GlobalContext } from "~/contexts/GlobalContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import WriteModal from "../common/WriteModal";
import { writeFormSchema } from "~/validation/formValidation";
import { api } from "~/utils/api";

type WriteFormType = {
  title: string;
  description: string;
  text: string;
};

const WriteFormModal = () => {
  const { isWriteModalOpen, setIsWriteModalOpen } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WriteFormType>({
    resolver: zodResolver(writeFormSchema),
  });

  const postRoute = api.useContext().post;

  const createPost = api.post.createPost.useMutation({
    onError() {
      toast.error("Something went wrong. Please try again later");
    },
    onSuccess() {
      toast.success("Post created successfully");
      setIsWriteModalOpen(false);
      reset();
      postRoute.getPosts.invalidate(); // Refetch posts
    },
  });

  const onsubmit = (data: WriteFormType) => {
    createPost.mutate(data);
  };

  return (
    <>
      <WriteModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        title="Create your blog"
      >
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <div className="flex w-full flex-col">
            <div className="mb-1 flex w-full justify-start text-xs text-red-700">
              {errors.title?.message}
            </div>
            <input
              type="text"
              {...register("title")}
              id="title"
              placeholder="Title"
              className="h-full w-full rounded-md border border-gray-300 p-3 text-sm outline-none focus:border-gray-600"
            />
          </div>
          <div className="flex w-full flex-col">
            <div className="mb-1 flex w-full justify-start space-y-1 text-xs text-red-700">
              {errors.description?.message}
            </div>
            <input
              type="text"
              {...register("description")}
              id="shortDescription"
              placeholder="Short description"
              className="h-full w-full rounded-md border border-gray-300 p-3 text-sm outline-none focus:border-gray-600"
            />
          </div>
          <div className="flex w-full flex-col">
            <div className="mb-1 flex w-full justify-start space-y-1 text-xs text-red-700">
              {errors.text?.message}
            </div>
            <textarea
              {...register("text")}
              id="mainBody"
              placeholder="Content goes here..."
              className="h-full w-full rounded-md border border-gray-300 p-3 text-sm outline-none focus:border-gray-600"
              cols={10}
              rows={10}
            />
          </div>

          <div className="flex w-full justify-end">
            <a
              onClick={() => setIsWriteModalOpen(false)}
              className="mx-1.5 cursor-pointer space-x-3 rounded border border-gray-200 bg-gray-200 px-4 py-1 text-sm transition hover:border-gray-900 hover:text-gray-900"
            >
              Cancel
            </a>
            <button
              type="submit"
              className="mx-1.5 space-x-3 rounded border border-gray-200 bg-red-600 px-4 py-1 text-sm text-white transition hover:border-gray-900 hover:text-gray-900"
            >
              Publish
            </button>
          </div>
        </form>
      </WriteModal>
    </>
  );
};

export default WriteFormModal;
