import { getCurrentUser } from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const { user } = await getCurrentUser();

  if(!user) {
    redirect("/login");
  }
  
  return (
    <div>AdminPage</div>
  )
}
