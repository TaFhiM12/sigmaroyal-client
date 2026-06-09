import { TeamCategory } from "@/types/team";

export const teamCategories: TeamCategory[] = [
  { label: "All", slug: "all" },
  { label: "Core Management", slug: "core-management", department: "Core Management" },
  { label: "HR & ADMIN", slug: "hr-admin", department: "HR & ADMIN" },
  { label: "Accounts & Finance", slug: "accounts-finance", department: "Accounts & Finance" },
  { label: "All Engineers", slug: "engineers", department: "All Engineers" },
  { label: "All Officers", slug: "officers", department: "All Officers" },
  { label: "All Member", slug: "members", department: "All Member" },
];

export const defaultTeamPhoto =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop";

export function getTeamCategory(slug?: string) {
  return teamCategories.find((category) => category.slug === slug) || teamCategories[0];
}
