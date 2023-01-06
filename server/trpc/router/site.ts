import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const siteRouter = router({
  getAllActive: publicProcedure.query(({ ctx, input }) => {
    return ctx.prisma.site.findMany({
      where: {
        imageUrl: {
          not: null,
        },
      },
    });
  }),

  getFiltered: publicProcedure
    .input(
      z.object({
        tag: z.string().nullable(),
        category: z.string().nullable(),
      })
    )
    .query(({ ctx, input }) => {
      const and = input?.tag
        ? {
            techTags: {
              has: input.tag,
            },
          }
        : {};

      const category = input?.category
        ? {
            category: input.category,
          }
        : {};
      return ctx.prisma.site.findMany({
        where: {
          imageUrl: {
            not: null,
          },
          OR: [and, category],
        },
      });
    }),
  getTags: publicProcedure
    .input(
      z.object({
        tag: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.site.aggregate({
        _count: {
          techTags: true,
        },
        where: {
          techTags: {
            has: input.tag,
          },
        },
      });
    }),
  getCategoryCounts: publicProcedure.query(({ ctx, input }) => {
    return ctx.prisma.site.groupBy({
      by: ["category"],
      _count: {
        category: true,
      },
      where: {
        category: {
          not: null,
        },
      },
    });
  }),
  get6RandomActive: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.site.findMany({
      where: {
        imageUrl: {
          not: null,
        },
      },
      take: 3,
      orderBy: {
        stargazersCount: "desc",
      },
    });
  }),
  add: publicProcedure
    .input(
      z.object({
        websiteUrl: z.string().url(),
        githubUrl: z
          .string()
          .url()
          .regex(/https:\/\/github.com\/.*/, "Must be a GitHub URL"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existingGithubUrlOrWebsiteUrl = await ctx.prisma.site.findFirst({
        where: {
          OR: [
            {
              githubUrl: input.githubUrl,
            },
            {
              websiteUrl: input.websiteUrl,
            },
          ],
        },
      });

      if (existingGithubUrlOrWebsiteUrl) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Site already exists",
        });
      }

      const site = await ctx.prisma.site.create({
        data: input,
      });
      return site;
    }),
});
