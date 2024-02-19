import AuthContextProvider from "./AuthContextProvider";
import { getCurrentUser } from "./auth";

// get session user in the server and pass it to a client component that creates the context
// and sets the user. This is a workaround to avoid fetching on the client
export default async function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return <AuthContextProvider user={user}>{children}</AuthContextProvider>;
}
