import TeamDirectory from "@/app/components/team/TeamDirectory";
import { getTeamCategory } from "@/app/data/team";
import { apiUrl, publicApiFetchOptions } from "@/lib/api";
import { TeamMember, TeamResponse } from "@/types/team";

export const revalidate = 3600;

export const metadata = {
  title: "RUSL | Team",
};

async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const res = await fetch(apiUrl("/employees"), publicApiFetchOptions);
    if (!res.ok) return [];

    const data = (await res.json()) as TeamResponse;
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return [];
  }
}

export default async function TeamPage() {
  const members = await getTeamMembers();

  return <TeamDirectory members={members} activeCategory={getTeamCategory("all")} />;
}
