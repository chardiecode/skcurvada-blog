import { useRouter } from "next/router";
import React from "react";
import MainLayout from "~/layouts/MainLayout";

const BlogPage = () => {
  const router = useRouter();
  console.log(router);
  return (
    <MainLayout>
      <div className="flex h-full w-full flex-col items-center p-10">
        <div className="align-m w-full max-w-screen-lg flex-col space-y-6">
          <div className="h-[60vh] w-full rounded-lg bg-gray-300 shadow-lg">
            featuted image
          </div>
          <div className="border-l-4 border-gray-700 pl-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            nulla iste, dolores nostrum dolor ab perspiciatis id numquam hic at
            dolorum deserunt quae neque beatae autem? Excepturi magni odit quam.
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident
            molestiae incidunt sapiente vitae natus repudiandae, magni totam
            distinctio enim amet numquam, delectus dolor velit fuga, non id eius
            corrupti necessitatibus? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Tempore amet laudantium molestiae natus explicabo
            voluptatem impedit odit harum, accusantium necessitatibus laboriosam
            velit atque adipisci ducimus consectetur quibusdam et excepturi
            nesciunt.
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogPage;
