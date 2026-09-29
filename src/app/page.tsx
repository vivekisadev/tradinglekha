import { getUser } from "@/lib/auth";
import { LandingClient } from "./landing-client";

export default async function Page() {
  const user = await getUser();
  
  return <LandingClient user={user} />;
}
