import { authMiddleware, redirectToSignUp } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    // pages
    "/",
    "/search",
    "/developers",
    "/developers/:id",
    "/projects",
    "/projects/:id",
    "/spotlight",

    // endpoints
    "/api/projects",
    "/api/projects/:id/comments",
    "/api/projects/:id/liked",
    "/api/tools",
    "/api/skills",
    "/api/developers",
    "/api/chat",

    // cron jobs
    "/api/spotlights",
    "/api/spotlights/fake",
  ],
  afterAuth(auth, req) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const returnBackUrl = req.nextUrl.origin + "/register";
      // make sure to redirect to register after every sign up
      return redirectToSignUp({ returnBackUrl });
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
