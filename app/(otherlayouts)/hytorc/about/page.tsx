import { notFound } from "next/navigation";
import HytorcCategoryView from "@/app/components/hytorc/HytorcCategoryView";
import { HytorcApiResponse, HytorcCategory } from "@/types/hytorc";

export const dynamic = "force-dynamic";

async function getAboutCategory(): Promise<HytorcCategory | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hytorc/categories/about`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

async function getFallbackAbout(): Promise<HytorcCategory | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hytorc/categories`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data: HytorcApiResponse = await res.json();
    return data.data.find((category) => category.slug === "about") || null;
  } catch {
    return null;
  }
}

export default async function HytorcAboutPage() {
  const category = (await getAboutCategory()) || (await getFallbackAbout());

  if (!category) {
    notFound();
  }

  return <HytorcCategoryView category={category} />;
}
