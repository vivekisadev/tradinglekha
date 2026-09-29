import { getUser } from "@/lib/auth";
import { ProFeatureLock } from "@/components/pro-feature-lock";
import { PlaybookClientPage } from "./client-page";

export default async function PlaybookPage() {
  const user = await getUser();
  
  return (
    <ProFeatureLock isPro={user?.isPro || false} title="Playbook" description="The advanced Playbook system is a Pro feature. Build and track custom trading setups to secure your edge.">
      <PlaybookClientPage />
    </ProFeatureLock>
  );
}