import { TRPCError } from "@trpc/server";
import slugify from "slugify";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const tagRouter = createTRPCRouter({
  createTag: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      const tag = await prisma.tag.findUnique({
        where: {
          name: input.name,
        },
      });
      if (tag) {
        throw new TRPCError({
          message: "Tag already exists!",
          code: "CONFLICT",
        });
      }
      await prisma.tag.create({
        data: {
          ...input,
          slug: slugify(input.name),
        },
      });
    }),
});
