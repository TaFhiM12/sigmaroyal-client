import { NextResponse } from "next/server";
import { getCompanyStats } from "@/lib/company-stats";

export const revalidate = 300;

export async function GET() {
  const data = await getCompanyStats();
  return NextResponse.json({ success: true, data });
}
