import { useRouter } from "next/router";
import React from "react";
import Avatar from "~/components/common/user/Avatar";
import MainLayout from "~/layouts/MainLayout";
import { api } from "~/utils/api";
import { BiEdit } from "react-icons/bi";

const UserProfilePage = () => {
  const router = useRouter();

  const userProfile = api.user.getUserProfile.useQuery(
    {
      username: router.query.username as string,
    },
    {
      enabled: !!router.query.username, // Only fetch to server if router.query.username is present
    }
  );
  return (
    <MainLayout>
      <div className="flex h-full w-full justify-center">
        <div className="my-10 flex h-full w-full flex-col lg:max-w-screen-md xl:max-w-screen-xl">
          <div className="relative h-44 w-full bg-gradient-to-r from-red-500 to-blue-500">
            <div className="absolute -bottom-10 left-10">
              <div className="group relative h-24 w-24 rounded-full border-2 bg-gray-300">
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
                  />
                </label>
                {userProfile.data?.image ? (
                  <Avatar
                    src={userProfile.data?.image}
                    alt={userProfile.data?.name ?? ""}
                  />
                ) : null}
              </div>
            </div>
            <p className="text-yell">This is a profile page</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserProfilePage;
