import { createUser, getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

async function RegisterUser() {
  // if the user visits this page by accident and their user already exists
  // redirect them to their profile page
  // otherwise create a new user and redirect them to their profile page
  const userExisted = await getCurrentUser();
  if (userExisted) {
    redirect("/profile");
  } else {
    await createUser()
    redirect("/profile");
  }
}

export default RegisterUser;
