import { router } from "../trpc";
import { authRouter } from "./auth";
import { siteRouter } from "./site";
import { viewsCountRouter } from "./viewsCount";

export const appRouter = router({
  site: siteRouter,
  auth: authRouter,
  view: viewsCountRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
