import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import isDataURI from "validator/lib/isDataURI";
import { decode } from "base64-arraybuffer";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { TRPCError } from "@trpc/server";

const supabase = createClient(env.SUPABASE_PUBLIC_URL, env.SUPABASE_PUBLIC_KEY);

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
          _count: {
            select: {
              posts: true,
            },
          },
        },
      });
    }),
  getUserPosts: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ ctx: { prisma, session }, input: { username } }) => {
      return await prisma.user.findUnique({
        where: {
          username,
        },
        select: {
          posts: {
            take: 5,
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
          },
        },
      });
    }),

  uploadAvatar: protectedProcedure
    .input(
      z.object({
        imageAsDataUrl: z.string().refine((val) => isDataURI(val)),
        // imageAsDataUrl: z.string(),
        username: z.string(),
      })
    )
    .mutation(async ({ ctx: { prisma, session }, input }) => {
      const imageBase64Str = input.imageAsDataUrl.replace(/^.+,/, "");
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`avatars/${input.username}.png`, decode(imageBase64Str), {
          contentType: "image/png",
          // cacheControl: "3600",
          upsert: true,
        });
      console.log(data, error);
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "upload failed to supabase",
        });
      }
      const {
        data: { publicUrl },
      } = supabase.storage.from("public").getPublicUrl(data?.path);
      console.log({ publicUrl });
    }),
});
