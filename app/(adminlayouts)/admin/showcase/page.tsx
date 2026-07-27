"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUp, Eye, EyeOff, ImagePlus, Loader2, Save, Trash2 } from "lucide-react";
import CloudinaryUpload from "../components/CloudinaryUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiUrl } from "@/lib/api";
import { getAdminAuthHeaders } from "@/lib/admin-auth";
import type { ShowcaseImage } from "@/types/showcase";

const emptyForm = { imageUrl: "", title: "", location: "" };

export default function ShowcaseAdminPage() {
  const [items, setItems] = useState<ShowcaseImage[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl("/showcase/admin"), {
        headers: getAdminAuthHeaders(),
        cache: "no-store",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not load showcase images");
      setItems(result.data || []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load showcase images");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  const createItem = async () => {
    if (!form.imageUrl || !form.title.trim()) {
      setMessage("Upload an image and add a short project title first.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch(apiUrl("/showcase"), {
        method: "POST",
        headers: { ...getAdminAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sortOrder: items.length, isActive: true }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not add image");
      setForm(emptyForm);
      setMessage("Image added to the public project showcase.");
      await loadItems();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not add image");
    } finally {
      setSaving(false);
    }
  };

  const updateItem = async (item: ShowcaseImage) => {
    setSaving(true);
    try {
      const response = await fetch(apiUrl(`/showcase/${item.id}`), {
        method: "PUT",
        headers: { ...getAdminAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({
          title: item.title,
          location: item.location,
          isActive: item.isActive,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not update image");
      setMessage("Showcase image updated.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not update image");
    } finally {
      setSaving(false);
    }
  };

  const reorder = async (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= items.length) return;
    const reordered = [...items];
    [reordered[index], reordered[nextIndex]] = [reordered[nextIndex], reordered[index]];
    setItems(reordered);
    try {
      const response = await fetch(apiUrl("/showcase/reorder"), {
        method: "PUT",
        headers: { ...getAdminAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ ids: reordered.map((item) => item.id) }),
      });
      if (!response.ok) throw new Error("Could not save image order");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save image order");
      await loadItems();
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Remove this image from the showcase?")) return;
    try {
      const response = await fetch(apiUrl(`/showcase/${id}`), {
        method: "DELETE",
        headers: getAdminAuthHeaders(),
      });
      if (!response.ok) throw new Error("Could not delete image");
      setItems((current) => current.filter((item) => item.id !== id));
      setMessage("Showcase image removed.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not delete image");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">Homepage filmstrip</p>
        <h1 className="mt-1 text-3xl font-semibold text-(--brand-navy)">Project Showcase</h1>
        <p className="mt-1 text-sm text-(--brand-muted)">
          Upload, publish and arrange the project photographs displayed immediately above the website footer.
        </p>
      </div>

      {message && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-950">{message}</div>
      )}

      <Card className="border-[#d8e4f5]">
        <CardHeader><CardTitle>Add a showcase image</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <CloudinaryUpload
            multiple={false}
            maxFiles={1}
            folder="royal-utilisation/showcase"
            onUpload={(urls) => setForm((current) => ({ ...current, imageUrl: urls[0] || "" }))}
          />
          {form.imageUrl && (
            <div className="relative aspect-[16/7] max-w-xl overflow-hidden rounded-xl bg-slate-100">
              <Image src={form.imageUrl} alt="Uploaded project preview" fill className="object-cover" sizes="600px" />
            </div>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="showcase-title">Project title</Label>
              <Input id="showcase-title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="e.g. Gas Transmission Station" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="showcase-location">Location (optional)</Label>
              <Input id="showcase-location" value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} placeholder="e.g. Sirajganj, Bangladesh" />
            </div>
          </div>
          <Button onClick={createItem} disabled={saving || !form.imageUrl} className="bg-red-600 hover:bg-red-700">
            {saving ? <Loader2 className="mr-2 size-4 animate-spin" /> : <ImagePlus className="mr-2 size-4" />}
            Add to showcase
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold text-(--brand-navy)">Live sequence</h2>
            <p className="text-sm text-(--brand-muted)">Use the arrows to control the order. Hidden items stay in the admin list.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{items.length} images</span>
        </div>

        {loading ? (
          <div className="flex min-h-40 items-center justify-center"><Loader2 className="size-6 animate-spin text-red-600" /></div>
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">No custom images yet. The website will temporarily use project gallery photos.</div>
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {items.map((item, index) => (
              <Card key={item.id} className="overflow-hidden border-[#d8e4f5]">
                <div className="grid sm:grid-cols-[210px_1fr]">
                  <div className="relative min-h-44 bg-slate-100">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="210px" />
                    <span className="absolute left-3 top-3 rounded-full bg-slate-950/80 px-2.5 py-1 text-xs font-bold text-white">#{index + 1}</span>
                  </div>
                  <CardContent className="space-y-3 p-4">
                    <Input value={item.title} onChange={(event) => setItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, title: event.target.value } : entry))} />
                    <Input value={item.location || ""} onChange={(event) => setItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, location: event.target.value } : entry))} placeholder="Location" />
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" onClick={() => void reorder(index, -1)} disabled={index === 0}><ArrowUp className="size-4" /></Button>
                      <Button size="sm" variant="outline" onClick={() => void reorder(index, 1)} disabled={index === items.length - 1}><ArrowDown className="size-4" /></Button>
                      <Button size="sm" variant="outline" onClick={() => setItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, isActive: !entry.isActive } : entry))}>
                        {item.isActive ? <Eye className="mr-1.5 size-4" /> : <EyeOff className="mr-1.5 size-4" />}{item.isActive ? "Visible" : "Hidden"}
                      </Button>
                      <Button size="sm" onClick={() => void updateItem(item)} disabled={saving}><Save className="mr-1.5 size-4" />Save</Button>
                      <Button size="sm" variant="destructive" onClick={() => void remove(item.id)}><Trash2 className="size-4" /></Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
