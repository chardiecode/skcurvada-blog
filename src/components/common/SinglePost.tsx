// import dayjs from "dayjs";
// import { BsChat } from "react-icons/bs";
// import { FcLike } from "react-icons/fc";
// import Image from "next/image";
// import { api } from "~/utils/api";

// interface PostProps {
//   slug: any;
// }

// const SinglePost = ({ slug }: PostProps) => {
//   const getPost = api.post.getPost.useQuery(
//     {
//       slug,
//     },
//     {
//       enabled: !!slug, // Only get the post when slug is defined
//     }
//   );
//   return (
//     <div className="flex h-full w-full flex-col items-center p-10">
//       <div className="w-full max-w-screen-md flex-col space-y-4">
//         {getPost.isLoading && <div>Loading...</div>}

//         <div className="relative h-[40vh] w-full rounded-lg bg-gray-300 shadow-lg">
//           <div className="absolute bottom-4 left-4 flex w-full items-center">
//             {getPost.data?.title}
//           </div>
//         </div>
//         <div className="flex pt-3">
//           <div className="relative h-8 w-8 rounded-full bg-gray-500">
//             <Image
//               src={getPost?.data?.author.image! ?? ""}
//               alt="Profile image"
//               fill
//               className="rounded-full"
//             />
//           </div>
//           <div className="ml-2">
//             <p className="text-xs">
//               <span className="font-semibold">{getPost.data?.author.name}</span>{" "}
//               &#x2022;{" "}
//               <span className="text-gray-500">
//                 {dayjs(getPost.data?.createdAt).format("MMM D, YYYY h:mm A")}
//               </span>
//             </p>
//             <p className="text-xs text-gray-500">
//               Father, Founder, teacher and software developer
//             </p>
//           </div>
//         </div>
//         {getPost.isSuccess && (
//           <div className="flex w-full">
//             <div className="flex gap-4 rounded-lg bg-white p-2">
//               <div className="cursor-pointer">
//                 <FcLike className="text-xl" />
//               </div>
//               <div className="cursor-pointer">
//                 <BsChat className="text-xl" />
//               </div>
//             </div>
//           </div>
//         )}
//         <div className="border-l-4 border-gray-700 pl-6">
//           {getPost.data?.description}
//         </div>
//         <div>{getPost.data?.text}</div>
//       </div>
//     </div>
//   );
// };

// export default SinglePost;
