import { Prisma } from "@prisma/client";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAllSites: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.site.findMany();
  }),

  getSelectedTags: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.jobTag.findMany({
      orderBy: {
        slug: "asc",
      },
    });
  }),
  getAllJobs: publicProcedure
    .input(
      z
        .object({
          filter: z.string().nullish(),
          sortByNewest: z.boolean().nullish(),
          cursorId: z.string().nullish(),
          lastId: z.number().nullish(),
        })
        .nullish()
    )
    .query(({ ctx, input }) => {
      const all = ["react", "javascript", "typescript"];

      return ctx.prisma.jobItem.findMany({
        include: {
          jobTags: true,
        },

        orderBy: {
          firebaseCreatedAt: input?.sortByNewest
            ? Prisma.SortOrder.desc
            : Prisma.SortOrder.asc,
        },
        where: {
          jobTags: {
            some: {
              slug: {
                in: input?.filter ? [input?.filter] : all,
              },
            },
          },
        },
      });
    }),
});
