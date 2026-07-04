"use client";

import { useEffect, useState } from "react";
import { CompanyStats, CompanyStatsResponse } from "@/types/company-stats";

export function useCompanyStats() {
  const [stats, setStats] = useState<CompanyStats | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/company-stats", {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load company statistics");
        return response.json() as Promise<CompanyStatsResponse>;
      })
      .then((response) => {
        if (response.success) setStats(response.data);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.error("Failed to load company statistics:", error);
      });

    return () => controller.abort();
  }, []);

  return stats;
}
