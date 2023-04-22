import React from "react";

const Aside = () => {
  return (
    <aside className="col-span-4 flex flex-col space-y-4 p-8">
      <div className="sticky top-6">
        <div className="space-y-3 border-b border-b-gray-300 pb-7">
          <h3 className="mb-5 text-sm">People you might be interested in</h3>
          <div className="flex flex-col space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div className="flex flex-row items-center space-x-4" key={i}>
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
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Aspernatur minus autem commodi.
                </div>
                <div className="flex w-full items-center space-x-1">
                  <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                  <div className="text-xs">
                    <span className="font-semibold">Aya Poarch</span> &#x2022;{" "}
                    <span className="text-gray-500">April 16, 2023</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Aside;
