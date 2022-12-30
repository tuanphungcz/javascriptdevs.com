import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const siteRouter = router({
  getAllActive: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.site.findMany({
      where: {
        imageUrl: {
          not: null,
        },
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
