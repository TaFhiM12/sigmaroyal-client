import { notFound } from "next/navigation";
import TeamDirectory from "@/app/components/team/TeamDirectory";
import { getTeamCategory, teamCategories } from "@/app/data/team";
import { apiUrl, publicApiFetchOptions } from "@/lib/api";
import { TeamMember, TeamResponse } from "@/types/team";

export const revalidate = 3600;

export function generateStaticParams() {
  return teamCategories
    .filter((category) => category.slug !== "all")
    .map((category) => ({
      category: category.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const teamCategory = getTeamCategory(category);

  return {
    title: `RUSL | ${teamCategory.label}`,
  };
}

async function getTeamMembers(department: string): Promise<TeamMember[]> {
  try {
    const res = await fetch(
      apiUrl(`/employees?department=${encodeURIComponent(department)}`),
      publicApiFetchOptions
    );
    if (!res.ok) return [];

    const data = (await res.json()) as TeamResponse;
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return [];
  }
}

export default async function TeamCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const activeCategory = getTeamCategory(category);
  const isKnownCategory = teamCategories.some((item) => item.slug === category);

  if (!isKnownCategory || !activeCategory.department) {
    notFound();
  }

  const members = await getTeamMembers(activeCategory.department);

  return <TeamDirectory members={members} activeCategory={activeCategory} />;
}
