import { notFound, redirect } from "next/navigation";
import { getLegacyRoute } from "@/lib/legacy-routes";

export default async function LegacyHtmlPage({
  params,
}: {
  params: Promise<{ file: string }>;
}) {
  const { file } = await params;
  const route = getLegacyRoute(file);

  if (!route) notFound();
  redirect(route);
}
