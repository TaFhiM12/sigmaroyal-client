"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FileText, ImageIcon, Loader2, Save, Search, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { PageContent, PageContentFormData } from "@/types/page-content";
import { apiUrl } from "@/lib/api";
import { getAdminAuthHeaders } from "@/lib/admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CloudinaryUpload from "./CloudinaryUpload";

interface PageContentAdminClientProps {
  initialPages: PageContent[];
}

const toJsonString = (value: unknown) => {
  try {
    return JSON.stringify(value ?? [], null, 2);
  } catch {
    return "[]";
  }
};

const toFormData = (page: PageContent): PageContentFormData => ({
  label: page.label || "",
  path: page.path || "",
  heroTitle: page.heroTitle || "",
  heroSubtitle: page.heroSubtitle || "",
  heroImageUrl: page.heroImageUrl || "",
  introTitle: page.introTitle || "",
  introBody: page.introBody || "",
  sections: toJsonString(page.sections),
  seoTitle: page.seoTitle || "",
  seoDescription: page.seoDescription || "",
  isPublished: page.isPublished,
});

export default function PageContentAdminClient({ initialPages }: PageContentAdminClientProps) {
  const [pages, setPages] = useState(initialPages);
  const [query, setQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState(initialPages[0]?.slug || "");
  const [saving, setSaving] = useState(false);

  const selectedPage = pages.find((page) => page.slug === selectedSlug) || pages[0];
  const [form, setForm] = useState<PageContentFormData>(() => selectedPage ? toFormData(selectedPage) : {
    label: "",
    path: "",
    heroTitle: "",
    heroSubtitle: "",
    heroImageUrl: "",
    introTitle: "",
    introBody: "",
    sections: "[]",
    seoTitle: "",
    seoDescription: "",
    isPublished: true,
  });

  const filteredPages = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return pages;
    return pages.filter((page) =>
      [page.label, page.slug, page.path || ""].some((item) => item.toLowerCase().includes(value)),
    );
  }, [pages, query]);

  const selectPage = (page: PageContent) => {
    setSelectedSlug(page.slug);
    setForm(toFormData(page));
  };

  const refreshPages = useCallback(async () => {
    const res = await fetch(apiUrl("/page-content"), {
      headers: getAdminAuthHeaders(),
      cache: "no-store",
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setPages(data.data);
      if (!selectedSlug && data.data[0]) {
        setSelectedSlug(data.data[0].slug);
        setForm(toFormData(data.data[0]));
      }
    }
  }, [selectedSlug]);

  useEffect(() => {
    if (initialPages.length === 0) {
      void refreshPages();
    }
  }, [initialPages.length, refreshPages]);

  const seedDefaults = async () => {
    try {
      const res = await fetch(apiUrl("/page-content/seed-defaults"), {
        method: "POST",
        headers: getAdminAuthHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to seed page content");
      await refreshPages();
      toast.success("Default page records are ready");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to seed page content");
    }
  };

  const savePage = async () => {
    if (!selectedPage) return;

    let parsedSections: unknown;
    try {
      parsedSections = JSON.parse(form.sections || "[]");
    } catch {
      toast.error("Sections JSON is invalid. Please fix it before saving.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(apiUrl(`/page-content/${selectedPage.slug}`), {
        method: "PUT",
        headers: getAdminAuthHeaders(),
        body: JSON.stringify({
          ...form,
          path: form.path || null,
          heroTitle: form.heroTitle || null,
          heroSubtitle: form.heroSubtitle || null,
          heroImageUrl: form.heroImageUrl || null,
          introTitle: form.introTitle || null,
          introBody: form.introBody || null,
          sections: parsedSections,
          seoTitle: form.seoTitle || null,
          seoDescription: form.seoDescription || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to save page content");

      setPages((current) => current.map((page) => page.slug === selectedPage.slug ? data.data : page));
      setForm(toFormData(data.data));
      toast.success("Page content saved");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save page content");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <Card className="border-[#d8e4f5]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-(--brand-navy)">
            <FileText className="h-5 w-5 text-red-600" />
            Website Pages
          </CardTitle>
          <CardDescription>Select any website page and edit its public content.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--brand-muted)" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search pages..."
              className="pl-9"
            />
          </div>

          <div className="max-h-[620px] space-y-2 overflow-y-auto pr-1">
            {filteredPages.map((page) => (
              <button
                key={page.slug}
                type="button"
                onClick={() => selectPage(page)}
                className={`w-full rounded-lg border p-3 text-left transition ${
                  selectedSlug === page.slug
                    ? "border-red-200 bg-red-50"
                    : "border-[#d8e4f5] bg-white hover:border-red-100 hover:bg-[#f7faff]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-(--brand-navy)">{page.label}</p>
                    <p className="mt-0.5 text-xs text-(--brand-muted)">{page.path || page.slug}</p>
                  </div>
                  <Badge className={page.isPublished ? "bg-[#eef4ff] text-[var(--brand-blue)]" : "bg-[#f7faff] text-(--brand-muted)"}>
                    {page.isPublished ? "Live" : "Hidden"}
                  </Badge>
                </div>
              </button>
            ))}
          </div>

          <Button type="button" variant="outline" onClick={seedDefaults} className="w-full">
            Create Missing Default Pages
          </Button>
        </CardContent>
      </Card>

      {selectedPage ? (
        <div className="space-y-6">
          <Card className="border-[#d8e4f5]">
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <CardTitle className="text-2xl text-(--brand-navy)">Edit {selectedPage.label}</CardTitle>
                  <CardDescription>
                    Page key: <span className="font-mono">{selectedPage.slug}</span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-[#d8e4f5] px-3 py-2">
                  <Label htmlFor="isPublished" className="text-sm font-bold">Published</Label>
                  <Switch
                    id="isPublished"
                    checked={form.isPublished}
                    onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isPublished: checked }))}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Admin Label</Label>
                  <Input value={form.label} onChange={(event) => setForm((prev) => ({ ...prev, label: event.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Website Path</Label>
                  <Input value={form.path} onChange={(event) => setForm((prev) => ({ ...prev, path: event.target.value }))} placeholder="/about" />
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Hero / Page Heading</Label>
                    <Input value={form.heroTitle} onChange={(event) => setForm((prev) => ({ ...prev, heroTitle: event.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Hero / Page Body</Label>
                    <Textarea rows={4} value={form.heroSubtitle} onChange={(event) => setForm((prev) => ({ ...prev, heroSubtitle: event.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Hero Image URL</Label>
                    <Input value={form.heroImageUrl} onChange={(event) => setForm((prev) => ({ ...prev, heroImageUrl: event.target.value }))} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-[#d8e4f5] bg-[#eef4ff]">
                    {form.heroImageUrl ? (
                      <Image src={form.heroImageUrl} alt={form.heroTitle || "Page banner"} fill sizes="320px" className="object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-(--brand-muted)">
                        <ImageIcon className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <CloudinaryUpload
                    multiple={false}
                    maxFiles={1}
                    folder="royal-utilisation/page-content"
                    onUpload={(urls) => {
                      if (urls[0]) {
                        setForm((prev) => ({ ...prev, heroImageUrl: urls[0] }));
                        toast.success("Hero image URL updated");
                      }
                    }}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Intro / Section Heading</Label>
                  <Input value={form.introTitle} onChange={(event) => setForm((prev) => ({ ...prev, introTitle: event.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>SEO Title</Label>
                  <Input value={form.seoTitle} onChange={(event) => setForm((prev) => ({ ...prev, seoTitle: event.target.value }))} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Intro / Body Text</Label>
                <Textarea rows={5} value={form.introBody} onChange={(event) => setForm((prev) => ({ ...prev, introBody: event.target.value }))} />
              </div>

              <div className="space-y-2">
                <Label>SEO Description</Label>
                <Textarea rows={3} value={form.seoDescription} onChange={(event) => setForm((prev) => ({ ...prev, seoDescription: event.target.value }))} />
              </div>

              <div className="space-y-2">
                <Label>Flexible Sections JSON</Label>
                <Textarea
                  rows={10}
                  value={form.sections}
                  onChange={(event) => setForm((prev) => ({ ...prev, sections: event.target.value }))}
                  className="font-mono text-xs"
                />
                <p className="text-xs text-(--brand-muted)">
                  Use this for repeatable content: cards, lists, stats, extra images, CTA blocks, values, addresses, and page-specific sections.
                </p>
              </div>

              <div className="flex flex-col gap-3 border-t border-[#d8e4f5] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-(--brand-muted)">
                  <UploadCloud className="h-4 w-4 text-red-600" />
                  Changes publish through the API and static pages revalidate normally.
                </div>
                <Button type="button" onClick={savePage} disabled={saving} className="bg-red-600 hover:bg-red-700">
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Page Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-[#d8e4f5]">
          <CardHeader>
            <CardTitle className="text-(--brand-navy)">No page records yet</CardTitle>
            <CardDescription>Create the default records first, then edit all website pages from here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button type="button" onClick={seedDefaults} className="bg-red-600 hover:bg-red-700">
              Create Default Page CMS Records
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
