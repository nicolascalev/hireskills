import { authMiddleware, redirectToSignUp } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/developers",
    "/developers/:id",
    "/projects",
    "/projects/:id",
    "/api/tools",
    "/api/skills",
    "/api/projects",
    "/api/developers",
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
