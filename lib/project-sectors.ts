export const projectSectors = [
  { value: "OIL_GAS", label: "Oil & Gas", shortLabel: "O&G" },
  { value: "POWER_SECTOR", label: "Power Sector", shortLabel: "Power" },
  { value: "LNG", label: "LNG", shortLabel: "LNG" },
  { value: "LPG", label: "LPG", shortLabel: "LPG" },
  { value: "NG", label: "Natural Gas", shortLabel: "NG" },
  { value: "REFINERY", label: "Refinery", shortLabel: "Refinery" },
  { value: "PETROCHEMICAL", label: "Petrochemical", shortLabel: "Petrochem" },
  { value: "WATER_DISTRIBUTION", label: "Water Distribution", shortLabel: "Water" },
  { value: "INFRASTRUCTURE", label: "Infrastructure", shortLabel: "Infra" },
] as const;

export type ProjectSector = (typeof projectSectors)[number]["value"];

export const getProjectSectorLabel = (sector: string) =>
  projectSectors.find((item) => item.value === sector)?.label ??
  sector
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const getProjectSectorShortLabel = (sector: string) =>
  projectSectors.find((item) => item.value === sector)?.shortLabel ??
  getProjectSectorLabel(sector);
