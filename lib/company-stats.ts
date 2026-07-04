import { apiUrl } from "@/lib/api";
import yearsExperience from "@/lib/yearsExperience";
import { CompanyStats, CompanyStatsResponse } from "@/types/company-stats";

const emptyStats = (): CompanyStats => ({
  foundedYear: 1977,
  yearsOperating: yearsExperience,
  projects: {
    total: 0,
    completed: 0,
    ongoing: 0,
    upcoming: 0,
    bySector: [],
  },
  clients: 0,
  teamMembers: 0,
  certifications: 0,
});

type ListResponse<T> = {
  success?: boolean;
  data?: T[];
};

type ProjectsFallbackResponse = {
  meta?: { total?: number };
  counts?: {
    completed?: number;
    ongoing?: number;
    upcoming?: number;
    bySector?: Array<{ sector: string; _count: { sector: number } }>;
  };
};

async function fetchJson(url: string) {
  const response = await fetch(url, {
    next: { revalidate: 300 },
    headers: { Accept: "application/json" },
  });

  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

export async function getCompanyStats(): Promise<CompanyStats> {
  try {
    const response = (await fetchJson(apiUrl("/stats"))) as CompanyStatsResponse;
    if (response.success && response.data) return response.data;
  } catch {
    // The deployed API may not have the aggregate endpoint until its next deploy.
  }

  const stats = emptyStats();
  const results = await Promise.allSettled([
    fetchJson(apiUrl("/projects?limit=1")),
    fetchJson(apiUrl("/clients")),
    fetchJson(apiUrl("/employees")),
    fetchJson(apiUrl("/certifications")),
  ]);

  const projects =
    results[0].status === "fulfilled"
      ? (results[0].value as ProjectsFallbackResponse)
      : null;
  stats.projects.total = projects?.meta?.total ?? 0;
  stats.projects.completed = projects?.counts?.completed ?? 0;
  stats.projects.ongoing = projects?.counts?.ongoing ?? 0;
  stats.projects.upcoming = projects?.counts?.upcoming ?? 0;
  stats.projects.bySector =
    projects?.counts?.bySector?.map((item) => ({
      sector: item.sector,
      count: item._count.sector,
    })) ?? [];

  const clients =
    results[1].status === "fulfilled"
      ? (results[1].value as ListResponse<{ isActive?: boolean }>)
      : null;
  stats.clients =
    clients?.data?.filter((client) => client.isActive !== false).length ?? 0;

  const employees =
    results[2].status === "fulfilled"
      ? (results[2].value as ListResponse<{ isActive?: boolean }>)
      : null;
  stats.teamMembers =
    employees?.data?.filter((employee) => employee.isActive !== false).length ??
    0;

  const certifications =
    results[3].status === "fulfilled"
      ? (results[3].value as ListResponse<{ isActive?: boolean }>)
      : null;
  stats.certifications =
    certifications?.data?.filter(
      (certification) => certification.isActive !== false,
    ).length ?? 0;

  return stats;
}
