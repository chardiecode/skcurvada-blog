import { IoReorderThreeOutline } from "react-icons/io5";
import { BsBell } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { HiChevronDown } from "react-icons/hi";

const Homepage = () => {
  return (
    <div className="flex h-screen w-full flex-col">
      {/* Header */}
      <header className="border-gray-380 flex h-16 w-full flex-row items-center justify-around border-b bg-white py-8">
        <div>
          <IoReorderThreeOutline className="text-3xl text-gray-600" />
        </div>
        <div className="text-xl font-extrabold">Sk Curvada</div>
        <div className="flex items-center space-x-4">
          <div>
            <BsBell className="text-xl text-gray-600" />
          </div>
          <div>
            <div className="h-4 w-4 rounded-full bg-gray-600"></div>
          </div>
          <div>
            <button className="flex items-center space-x-3 rounded border border-gray-200 px-4 py-1 transition hover:border-gray-900 hover:text-gray-900">
              <div className="text-sm">Write</div>
              <div>
                <FiEdit />
              </div>
            </button>
          </div>
        </div>
      </header>
      {/* /Header */}
      <section className="grid w-full grid-cols-12">
        <main className="col-span-8 h-full w-full border-r border-gray-300 px-10 py-5">
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
              <div>Articles</div>
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
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-6">
                <div className="flex">
                  <div className="h-8 w-8 rounded-full bg-gray-500"></div>
                  <div className="ml-2">
                    <p className="text-xs">
                      <span className="font-semibold">Aya Poarch</span> &#x2022;{" "}
                      <span className="text-gray-500">April 16, 2023</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      Father, Founder, teacher and software developer
                    </p>
                  </div>
                </div>
                <div className="group grid min-h-[6rem] w-full grid-cols-12 gap-3">
                  <div className="col-span-8">
                    <p className="text-2sm font-bold group-hover:underline">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Iusto molestias eligendi
                    </p>
                    <p className="pt-3 text-xs text-gray-800">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Necessitatibus dolorem mollitia hic ducimus autem
                      temporibus qui veniam. Unde facilis dicta alias
                      voluptatibus tenetur exercitationem nisi, nesciunt,
                      consequatur officiis dolor quisquam.
                    </p>
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
            ))}
          </div>
        </main>
        <aside className="col-span-4 flex flex-col space-y-4 p-6">
          <div className="sticky top-6">
            <div className="space-y-3 border-b border-b-gray-300 pb-7">
              <h3 className="mb-5 text-sm">
                People you might be interested in
              </h3>
              <div className="flex flex-col space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div className="flex flex-row items-center space-x-4">
                    <div className="h-8 w-8 flex-none rounded-full bg-gray-500"></div>
                    <div>
                      <div className="text-xs font-bold text-gray-900">
                        Aya Poarch
                      </div>
                      <div className="text-xs text-gray-600">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Deserunt.
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
            <div>
              <h3 className="mb-5 mt-2 text-sm">Your reading list</h3>
              <div className="flex flex-col space-y-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    className="group flex items-center space-x-4 text-xs text-gray-600"
                    key={i}
                  >
                    <div className="aspect-square h-full w-2/5 rounded-xl bg-gray-300"></div>
                    <div className="flex w-3/5 flex-col space-y-2">
                      <div className="font-bold group-hover:underline">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </div>
                      <div>
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
          </div>
        </aside>
        <footer>This is a footer section</footer>
      </section>
    </div>
  );
};

export default Homepage;
