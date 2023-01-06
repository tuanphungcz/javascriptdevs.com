import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const viewsCountRouter = router({
  // createOrUpdate: publicProcedure
  //   .input(
  //     z.object({
  //       itemId: z.string(),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const item = await ctx.prisma.viewsCount.upsert({
  //       where: {
  //         itemId: input.itemId,
  //       },
  //       create: { itemId: input.itemId, count: 1 },
  //       update: {
  //         count: {
  //           increment: 1,
  //         },
  //       },
  //     });

  //     return item;
  //   }),
});
