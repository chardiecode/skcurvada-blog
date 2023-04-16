import { IoReorderThreeOutline } from "react-icons/io5";
import { BsBell } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { HiChevronDown } from "react-icons/hi";

const Homepage = () => {
  return (
    <div className="flex h-screen w-full flex-col">
      {/* Header */}
      <header className="border-gray-380 flex h-16 w-full flex-row items-center justify-around border-b bg-white py-4">
        <div>
          <IoReorderThreeOutline className="text-3xl text-gray-600" />
        </div>
        <div className="text-lg font-thin">Ultimate Blog App</div>
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
      <section className="grid h-full w-full grid-cols-12 place-items-center">
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
                <div>
                  <div>ChardieCode &#x2022; April 16, 2023</div>
                  <div>Father, Founder, teacher and software developer</div>
                </div>
                <div className="group grid min-h-[6rem] w-full grid-cols-12 gap-3">
                  <div className="col-span-8">
                    <p className="text-2sm font-bold group-hover:underline">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Iusto molestias eligendi
                    </p>
                    <p className="pt-3 text-xs text-gray-600">
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
        <aside className="col-span-4 h-full w-full">This is the sidebar</aside>
      </section>
    </div>
  );
};

export default Homepage;
