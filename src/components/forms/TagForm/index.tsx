import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { createTagSchema } from "~/validation/formValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";

import Modal from "~/components/WriteModal";

interface AppProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

type WriteTagType = {
  name: string;
  description: string;
};

const App: React.FC<AppProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WriteTagType>({
    resolver: zodResolver(createTagSchema),
  });
  const tagRoute = api.useContext().tag;
  const createTag = api.tag.createTag.useMutation({
    onError() {
      toast.error("Something went wrong. Please try again later");
    },
    onSuccess() {
      toast.success("Tag created successfully");
      tagRoute.invalidate();
      reset();
    },
  });
  const onSubmit = (data: WriteTagType) => {
    createTag.mutate(data);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Create tag">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <div className="mb-1 flex w-full justify-start text-xs text-red-700">
            {errors.name?.message}
          </div>
          <input
            type="text"
            {...register("name")}
            id="name"
            placeholder="Name of the tag"
            className="h-full w-full rounded-md border border-gray-300 p-3 text-sm outline-none focus:border-gray-600"
          />

          <div className="mb-1 flex w-full justify-start text-xs text-red-700">
            {errors.description?.message}
          </div>
          <input
            type="text"
            {...register("description")}
            id="description"
            placeholder="Description"
            className="h-full w-full rounded-md border border-gray-300 p-3 text-sm outline-none focus:border-gray-600"
          />
          <div className="flex w-full justify-end">
            <a
              onClick={onClose}
              className="mx-1.5 cursor-pointer space-x-3 rounded border border-gray-200 bg-gray-200 px-4 py-1 text-sm transition hover:border-gray-900 hover:text-gray-900"
            >
              Cancel
            </a>
            <button
              type="submit"
              className="mx-1.5 space-x-3 rounded border border-gray-200 bg-red-600 px-4 py-1 text-sm text-white transition hover:border-gray-900 hover:text-gray-900"
            >
              Create Tag
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default App;
