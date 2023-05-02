import { createTRPCRouter } from "~/server/api/trpc";
import { postRouter } from "~/server/api/routers/post/post";
import { userRouter } from "~/server/api/routers/user/user";
import { authRouter } from "~/server/api/routers/auth/auth";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
