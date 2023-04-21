import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const postReducer = createTRPCRouter({
  createPost: protectedProcedure.mutation({}),
});
