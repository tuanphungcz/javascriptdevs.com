import { router } from "../trpc";
import { authRouter } from "./auth";
import { siteRouter } from "./site";

export const appRouter = router({
  site: siteRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
