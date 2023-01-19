import { router } from "../trpc";
import { siteRouter } from "./site";
import { viewsCountRouter } from "./viewsCount";

export const appRouter = router({
  site: siteRouter,
  view: viewsCountRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
