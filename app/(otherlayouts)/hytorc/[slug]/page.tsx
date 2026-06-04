import { notFound } from "next/navigation";
import HytorcCategoryView from "@/app/components/hytorc/HytorcCategoryView";
import { HytorcSingleApiResponse } from "@/types/hytorc";

interface HytorcCategoryPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

async function getCategory(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hytorc/categories/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data: HytorcSingleApiResponse = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export default async function HytorcCategoryPage({ params }: HytorcCategoryPageProps) {
  const { slug } = await params;

  if (slug === "about") {
    notFound();
  }

  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  return <HytorcCategoryView category={category} />;
}
