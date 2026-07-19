import TeamAdminClient from "../components/TeamAdminClient";
import { apiUrl } from "@/lib/api";
import { TeamMember, TeamResponse } from "@/types/team";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin - Manage Team",
  description: "Create, edit, and manage company team members",
};

async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const res = await fetch(apiUrl("/employees?includeInactive=true"), {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) return [];

    const data = (await res.json()) as TeamResponse;
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

export default async function AdminTeamPage() {
  const members = await getTeamMembers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-(--brand-navy)">Team Members</h1>
          <p className="mt-1 text-(--brand-muted)">Manage people shown on the public team pages</p>
        </div>
        <div className="rounded-lg border border-[#d8e4f5] bg-white px-4 py-3 text-sm text-(--brand-muted)">
          Total: <span className="font-bold text-(--brand-navy)">{members.length}</span>
        </div>
      </div>

      <TeamAdminClient initialMembers={members} />
    </div>
  );
}
