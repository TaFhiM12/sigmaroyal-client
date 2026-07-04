export interface CompanyStats {
  foundedYear: number;
  yearsOperating: number;
  projects: {
    total: number;
    completed: number;
    ongoing: number;
    upcoming: number;
    bySector: Array<{
      sector: string;
      count: number;
    }>;
  };
  clients: number;
  teamMembers: number;
  certifications: number;
}

export interface CompanyStatsResponse {
  success: boolean;
  data: CompanyStats;
}
