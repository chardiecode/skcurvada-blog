import dayjs from "dayjs";
import { CiSearch } from "react-icons/ci";
import { HiChevronDown } from "react-icons/hi";
import WriteFormModal from "~/components/Forms/WriteFormModal";
import MainLayout from "~/layouts/MainLayout";
import BlogList from "~/components/common/BlogList";
import Image from "next/image";
import { api } from "~/utils/api";

const Homepage = () => {
  const getPosts = api.post.getPosts.useQuery();
  return (
    <div className="flex h-screen w-full flex-col">
      <MainLayout>
        <section className="grid w-full grid-cols-12">
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
                getPosts.data?.map((post, i) => (
                  <BlogList post={post} key={i} />
                ))}
            </div>
          </main>
          <aside className="col-span-4 flex flex-col space-y-4 p-8">
            <div className="sticky top-6">
              <div className="space-y-3 border-b border-b-gray-300 pb-7">
                <h3 className="mb-5 text-sm">
                  People you might be interested in
                </h3>
                <div className="flex flex-col space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      className="flex flex-row items-center space-x-4"
                      key={i}
                    >
                      <div className="h-8 w-8 flex-none rounded-full bg-gray-500"></div>
                      <div>
                        <div className="text-xs font-bold text-gray-900">
                          Aya Poarch
                        </div>
                        <div className="text-xs text-gray-600">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Deserunt.
                        </div>
                      </div>
                      <div>
                        <button className="flex items-center space-x-3 rounded border border-gray-300 px-4 py-1 text-xs transition hover:border-gray-900 hover:text-gray-900">
                          Follow
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-6">
                <h3 className="mt-6 text-sm">Your reading list</h3>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    className="group flex items-center space-x-4 text-xs text-gray-600"
                    key={i}
                  >
                    <div className="aspect-square h-full w-2/5 rounded-xl bg-gray-300"></div>
                    <div className="flex w-3/5 flex-col space-y-2">
                      <div className="font-bold text-gray-800 group-hover:underline">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </div>
                      <div className="text-gray-600">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Aspernatur minus autem commodi.
                      </div>
                      <div className="flex w-full items-center space-x-1">
                        <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                        <div className="text-xs">
                          <span className="font-semibold">Aya Poarch</span>{" "}
                          &#x2022;{" "}
                          <span className="text-gray-500">April 16, 2023</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
          {/* <footer>This is a footer section</footer> */}
        </section>
      </MainLayout>
      <WriteFormModal />
    </div>
  );
};

export default Homepage;
