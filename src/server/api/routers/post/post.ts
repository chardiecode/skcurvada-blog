import { z } from "zod";
import slugify from "slugify";
import { writeFormSchema } from "~/components/Forms/WriteFormModal";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(writeFormSchema)
    .mutation(
      async ({
        ctx: { prisma, session },
        input: { title, description, text },
      }) => {
        // Check slug exists
        await prisma.post.create({
          data: {
            title,
            description,
            text,
            slug: slugify(title),
            author: {
              connect: {
                id: session.user.id,
              },
            },
          },
        });
      }
    ),
  getPosts: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const posts = await prisma.post.findMany({
      take: 5,
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return posts;
  }),
});
