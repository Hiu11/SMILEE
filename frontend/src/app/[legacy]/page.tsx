import { notFound, redirect } from "next/navigation";
import { getLegacyRoute } from "@/lib/legacy-routes";

export default async function LegacyPage({
  params,
}: {
  params: Promise<{ legacy: string }>;
}) {
  const { legacy } = await params;
  const route = getLegacyRoute(legacy);

  if (!route) notFound();
  redirect(route);
}
