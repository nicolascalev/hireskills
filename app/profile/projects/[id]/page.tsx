import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

async function ProfileProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!project) {
    return notFound();
  }

  const { userId } = auth();

  if (project.developerId !== userId) {
    return redirect("/profile/projects");
  }

  return (
    <pre style={{ maxWidth: "100%", overflowX: "auto" }}>
      {JSON.stringify(project, null, 2)}
    </pre>
  );
}

export default ProfileProjectPage;
