import slugify from "slugify";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { writeFormSchema } from "~/validation/formValidation";

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

  getPosts: publicProcedure.query(async ({ ctx: { prisma, session } }) => {
    const posts = await prisma.post.findMany({
      take: 15,
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        slug: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
          },
        },
        bookmarks: session?.user.id
          ? {
              where: {
                userId: session?.user.id,
              },
            }
          : false,
      },
    });
    return posts;
  }),

  getPost: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx: { prisma, session }, input: { slug } }) => {
      const post = await prisma.post.findUnique({
        where: {
          slug,
        },
        select: {
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
          id: true,
          description: true,
          title: true,
          createdAt: true,
          text: true,
          author: true,
          likes: session?.user?.id
            ? {
                where: {
                  userId: session?.user?.id,
                },
              }
            : false,
        },
      });
      return post;
    }),

  likePost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input: { postId } }) => {
      await prisma.like.create({
        data: {
          userId: session.user.id,
          postId,
        },
      });
    }),

  disLikePost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input: { postId } }) => {
      await prisma.like.delete({
        where: {
          userId_postId: {
            postId,
            userId: session.user.id,
          },
        },
      });
    }),

  bookmarkPost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input: { postId } }) => {
      await prisma.bookMark.create({
        data: {
          userId: session.user.id,
          postId,
        },
      });
    }),
  unBookmarkPost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input: { postId } }) => {
      await prisma.bookMark.delete({
        where: {
          userId_postId: {
            postId,
            userId: session.user.id,
          },
        },
      });
    }),

  comment: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        text: z.string().min(10),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input: { text, postId } }) => {
      await prisma.comment.create({
        data: {
          text,
          user: {
            connect: {
              id: session.user.id,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
        },
      });
    }),

  getComments: publicProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { postId } }) => {
      const comments = await prisma.comment.findMany({
        where: {
          postId,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          text: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
        },
      });
      return comments;
    }),

  getReadingLists: protectedProcedure.query(
    async ({ ctx: { prisma, session } }) => {
      const allBookmarks = prisma.bookMark.findMany({
        where: {
          userId: session.user.id,
        },
        take: 4,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          post: {
            select: {
              title: true,
              description: true,
              id: true,
              slug: true,
              author: {
                select: {
                  name: true,
                  image: true,
                  id: true,
                },
              },
              createdAt: true,
            },
          },
        },
      });
      return allBookmarks;
    }
  ),
});
