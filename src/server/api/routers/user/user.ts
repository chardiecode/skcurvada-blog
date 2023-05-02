import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getUserProfile: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { username } }) => {
      return await prisma.user.findUnique({
        where: {
          username,
        },
        select: {
          name: true,
          image: true,
          id: true,
          username: true,
        },
      });
    }),
});
