import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SettingsClientPage } from "./client-page";

export default async function SettingsPage() {
  const user = await getUser();
  
  if (!user) {
    redirect("/auth/login");
  }

  return <SettingsClientPage user={user} />;
}
