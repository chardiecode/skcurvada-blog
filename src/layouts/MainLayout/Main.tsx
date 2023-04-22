import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { HiChevronDown } from "react-icons/hi";

import Blog from "~/components/common/Blog";
import { api } from "~/utils/api";

const Main = () => {
  const getPosts = api.post.getPosts.useQuery();
  return (
    <main className="col-span-8 h-full w-full border-r border-gray-300 p-8">
      <div className="flex w-full flex-col space-y-4">
        <div className="flex w-full items-center space-x-4">
          <label
            htmlFor="search"
            className="relative w-full rounded-2xl border border-gray-300"
          >
            <div className="absolute left-1.5 flex h-full items-center">
              <CiSearch />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="w-full rounded-2xl px-4 py-1.5 pl-7 outline-none placeholder:text-sm placeholder:text-gray-300"
              placeholder="Search..."
            />
          </label>
          <div className="relative flex w-full items-center justify-end space-x-4">
            <div>My topics</div>
            <div className="flex items-center space-x-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  className="rounded-2xl bg-gray-200 px-4 py-2 text-xs"
                  key={i}
                >
                  tag{i}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between border-b border-b-gray-200 pb-6 pt-4">
          <div className="text-xl font-bold text-gray-950">
            Welcome to SK Curvada blogging website
          </div>
          <div>
            <button className="flex items-center space-x-2 rounded-3xl border border-gray-800 px-5 py-1.5">
              <div>following</div>
              <div>
                <HiChevronDown />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center space-y-10 py-6">
        {/* TODO: Replace skeleton loader */}
        {getPosts.isLoading && <div>Loading..............</div>}
        {getPosts.isSuccess &&
          getPosts.data?.map((post, i) => <Blog key={i} {...post} />)}
      </div>
    </main>
  );
};

export default Main;
