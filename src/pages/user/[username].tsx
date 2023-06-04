import { NextRouter, useRouter } from "next/router";
import React, { useState } from "react";
import Avatar from "~/components/common/Avatar";
import MainLayout from "~/layouts/MainLayout";
import { api } from "~/utils/api";
import { BiEdit } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-hot-toast";
import Blog from "~/components/Blog";
import { useSession } from "next-auth/react";

function usernameQuery(router: NextRouter) {
  return {
    username: router.query.username as string,
  };
}

function usernameEnableQuery(router: NextRouter) {
  return {
    enabled: !!router.query.username,
  };
}

const UserProfilePage = () => {
  const router = useRouter();
  const currentUser = useSession();

  const userProfile = api.user.getUserProfile.useQuery(
    usernameQuery(router),
    usernameEnableQuery(router) // Only fetch to server if router.query.username is present
  );

  const userPosts = api.user.getUserPosts.useQuery(
    usernameQuery(router),
    usernameEnableQuery(router) // Only fetch to server if router.query.username is present
  );

  const [objectImage, setObjectImage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const userRoute = api.useContext().user;

  const uploadAvatar = api.user.uploadAvatar.useMutation({
    onSuccess: () => {
      if (userProfile.data?.username) {
        userRoute.getUserProfile.invalidate(usernameQuery(router));
        toast.success("Avatar updated");
      }
    },
  });
  const username = userProfile.data?.username;

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 1.5 * 1000000) {
        // Accept max 1.5mb
        return toast.error("Image size should not be more than 1MB");
      }
      setObjectImage(URL.createObjectURL(file));

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onloadend = () => {
        if (fileReader.result && userProfile.data?.username) {
          console.warn(fileReader.result);
          uploadAvatar.mutate({
            imageAsDataUrl: fileReader.result as string,
            username: userProfile.data?.username,
          });
        }
      };
    }
  };

  const isCurrentUser = Boolean(
    currentUser?.data?.user.id === userProfile.data?.id
  );
  return (
    <MainLayout>
      <div className="flex h-full w-full justify-center">
        <div className="my-10 flex h-full w-full max-w-screen-md flex-col">
          <div className="flex w-full flex-col rounded-2xl bg-white shadow-lg">
            <div className="relative h-44 w-full rounded-t-2xl bg-gradient-to-r from-red-500 to-blue-500">
              <div className="absolute -bottom-10 left-10">
                <div className="group relative h-24 w-24 rounded-full border-2 bg-gray-300">
                  {isCurrentUser && (
                    <label
                      htmlFor="avatarFile"
                      className="absolute z-10 flex h-full w-full cursor-pointer items-center justify-center rounded-full transition group-hover:bg-black/40"
                    >
                      <BiEdit className="hidden text-2xl text-white group-hover:block" />

                      <input
                        className="sr-only"
                        type="file"
                        name="avatarFile"
                        id="avatarFile"
                        accept="image/*"
                        onChange={handleChangeImage}
                        multiple={false}
                      />
                    </label>
                  )}
                  {!objectImage && userProfile.data?.image ? (
                    <Avatar
                      src={userProfile.data?.image}
                      alt={userProfile.data?.name ?? ""}
                    />
                  ) : null}
                  {objectImage ? (
                    <Avatar
                      src={objectImage}
                      alt={userProfile.data?.name ?? ""}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="ml-12 mt-10 flex-col rounded-b-2xl py-5">
              <div className="text-gray-900">{userProfile.data?.name}</div>
              <div className="text-sm text-gray-500">@{username}</div>
              <div className="text-sm text-gray-500">
                {userProfile.data?._count?.posts ?? 0} posts
              </div>

              <div className="mt-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Url copied to clipboard");
                  }}
                  className="flex items-center space-x-3 rounded border border-gray-200 px-4 py-1 transition hover:border-gray-900 hover:text-gray-900"
                >
                  <div className="relative flex text-sm">Share</div>
                  <div>
                    <FiEdit />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="my-10 w-full">
            {userPosts.isSuccess &&
              userPosts.data?.posts.map((post, i) => (
                <div className="py-5" key={i}>
                  <Blog {...post} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserProfilePage;
