import { notFound } from "next/navigation";
import HytorcCategoryView from "@/app/components/hytorc/HytorcCategoryView";
import { HytorcApiResponse, HytorcCategory } from "@/types/hytorc";
import { apiUrl, publicApiFetchOptions } from "@/lib/api";

export const revalidate = 3600;

export const metadata = {
  title: "HYTORC Solutions",
  description: "HYTORC torque tools, pumps, fasteners, accessories and industrial bolting solutions from The Royal Utilisation Services.",
};

async function getAboutCategory(): Promise<HytorcCategory | null> {
  try {
    const res = await fetch(apiUrl("/hytorc/categories/about"), publicApiFetchOptions);

    if (!res.ok) return null;

    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

async function getFallbackAbout(): Promise<HytorcCategory | null> {
  try {
    const res = await fetch(apiUrl("/hytorc/categories"), publicApiFetchOptions);

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
