import { notFound } from "next/navigation";
import HytorcCategoryView from "@/app/components/hytorc/HytorcCategoryView";
import { HytorcApiResponse, HytorcSingleApiResponse } from "@/types/hytorc";
import { apiUrl, publicApiFetchOptions } from "@/lib/api";

interface HytorcCategoryPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const res = await fetch(apiUrl("/hytorc/categories"), publicApiFetchOptions);
    if (!res.ok) return [];

    const data = (await res.json()) as HytorcApiResponse;

    return data.data
      .filter((category) => category.slug !== "about")
      .map((category) => ({
        slug: category.slug,
      }));
  } catch {
    return [];
  }
}

async function getCategory(slug: string) {
  try {
    const res = await fetch(apiUrl(`/hytorc/categories/${slug}`), publicApiFetchOptions);

    if (!res.ok) return null;

    const data: HytorcSingleApiResponse = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: HytorcCategoryPageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: "HYTORC Solutions",
    };
  }

  return {
    title: `${category.title} | HYTORC`,
    description: category.description || "HYTORC industrial bolting and torque solutions.",
    openGraph: {
      title: `${category.title} | HYTORC`,
      description: category.description || "HYTORC industrial bolting and torque solutions.",
      images: category.products?.[0]?.imageUrl ? [category.products[0].imageUrl] : undefined,
    },
  };
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
