"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Database, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import CloudinaryUpload from "../components/CloudinaryUpload";
import { getAdminAuthHeaders } from "@/lib/admin-auth";
import { QhsePolicyResponse } from "@/types/qhse";

interface QhseFormState {
  pageTitle: string;
  breadcrumbLabel: string;
  sectionTitle: string;
  heroImageUrl: string;
  policyStatement: string;
  bulletPointsText: string;
  analysisStatement: string;
  goldenRulesTitle: string;
  goldenRulesText: string;
  isActive: boolean;
}

const emptyForm: QhseFormState = {
  pageTitle: "QHSE POLICY",
  breadcrumbLabel: "QHSE POLICY",
  sectionTitle: "QHSE POLICY",
  heroImageUrl: "",
  policyStatement: "",
  bulletPointsText: "",
  analysisStatement: "",
  goldenRulesTitle: "12 Golden Safety Rules",
  goldenRulesText: "",
  isActive: true,
};

export default function AdminQhsePolicyPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploaderKey, setUploaderKey] = useState(0);
  const [form, setForm] = useState<QhseFormState>(emptyForm);

  const fetchPolicy = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/qhse-policy`, {
        cache: "no-store",
      });

      const data: QhsePolicyResponse = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load policy");
      }

      setForm({
        pageTitle: data.data.pageTitle,
        breadcrumbLabel: data.data.breadcrumbLabel,
        sectionTitle: data.data.sectionTitle,
        heroImageUrl: data.data.heroImageUrl,
        policyStatement: data.data.policyStatement,
        bulletPointsText: data.data.bulletPoints.join("\n"),
        analysisStatement: data.data.analysisStatement,
        goldenRulesTitle: data.data.goldenRulesTitle,
        goldenRulesText: data.data.goldenRules.join("\n"),
        isActive: data.data.isActive,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to load QHSE policy");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicy();
  }, []);

  const handleImageUpload = (urls: string[]) => {
    if (!urls.length) return;

    setForm((prev) => ({
      ...prev,
      heroImageUrl: urls[0],
    }));

    toast.success("QHSE banner image uploaded");
  };

  const clearImage = () => {
    setForm((prev) => ({ ...prev, heroImageUrl: "" }));
    setUploaderKey((prev) => prev + 1);
  };

  const handleSave = async () => {
    if (!form.heroImageUrl) {
      toast.error("Please upload banner image first");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        pageTitle: form.pageTitle,
        breadcrumbLabel: form.breadcrumbLabel,
        sectionTitle: form.sectionTitle,
        heroImageUrl: form.heroImageUrl,
        policyStatement: form.policyStatement,
        bulletPoints: form.bulletPointsText
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
        analysisStatement: form.analysisStatement,
        goldenRulesTitle: form.goldenRulesTitle,
        goldenRules: form.goldenRulesText
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
        isActive: form.isActive,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/qhse-policy`, {
        method: "PUT",
        headers: getAdminAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save QHSE policy");
      }

      toast.success("QHSE policy updated successfully");
      await fetchPolicy();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save QHSE policy");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSeed = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/qhse-policy/seed-default`, {
        method: "POST",
        headers: getAdminAuthHeaders(),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to seed QHSE policy");
      }

      toast.success(data.message || "QHSE policy seed completed");
      await fetchPolicy();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to seed QHSE policy");
    }
  };

  if (loading) {
    return <div className="h-96 rounded-xl bg-zinc-100 animate-pulse" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold text-zinc-900">QHSE Policy</h1>
          <p className="text-zinc-600 mt-1">Manage public QHSE policy page content and safety rules.</p>
        </div>
        <Button onClick={handleSeed} variant="outline" className="border-zinc-300">
          <Database className="h-4 w-4 mr-2" />
          Seed Default QHSE
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Banner and Header</CardTitle>
          <CardDescription>Upload hero image and configure titles.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Page Title</Label>
              <Input value={form.pageTitle} onChange={(e) => setForm((p) => ({ ...p, pageTitle: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Breadcrumb Label</Label>
              <Input value={form.breadcrumbLabel} onChange={(e) => setForm((p) => ({ ...p, breadcrumbLabel: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Section Title</Label>
              <Input value={form.sectionTitle} onChange={(e) => setForm((p) => ({ ...p, sectionTitle: e.target.value }))} />
            </div>
          </div>

          <div className="space-y-3 rounded-lg border border-zinc-200 p-4 bg-zinc-50">
            <Label>Upload Banner Image</Label>
            <CloudinaryUpload
              key={uploaderKey}
              onUpload={handleImageUpload}
              multiple={false}
              maxFiles={1}
              folder="royal-utilisation/qhse"
            />
            {form.heroImageUrl ? (
              <div className="space-y-3">
                <div className="relative h-48 w-full max-w-xl rounded-lg overflow-hidden border border-zinc-200 bg-white">
                  <Image src={form.heroImageUrl} alt="QHSE banner" fill className="object-cover" />
                </div>
                <Button type="button" variant="outline" size="sm" onClick={clearImage}>
                  Replace Banner Image
                </Button>
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <Switch checked={form.isActive} onCheckedChange={(checked) => setForm((p) => ({ ...p, isActive: checked }))} />
            <Label>Show page content</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Policy Details</CardTitle>
          <CardDescription>Use one line per bullet point and one line per safety rule.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>Policy Statement</Label>
            <Textarea rows={3} value={form.policyStatement} onChange={(e) => setForm((p) => ({ ...p, policyStatement: e.target.value }))} />
          </div>

          <div className="space-y-2">
            <Label>Bullet Points</Label>
            <Textarea rows={8} value={form.bulletPointsText} onChange={(e) => setForm((p) => ({ ...p, bulletPointsText: e.target.value }))} />
          </div>

          <div className="space-y-2">
            <Label>Analysis Statement</Label>
            <Textarea rows={3} value={form.analysisStatement} onChange={(e) => setForm((p) => ({ ...p, analysisStatement: e.target.value }))} />
          </div>

          <div className="space-y-2">
            <Label>Golden Rules Title</Label>
            <Input value={form.goldenRulesTitle} onChange={(e) => setForm((p) => ({ ...p, goldenRulesTitle: e.target.value }))} />
          </div>

          <div className="space-y-2">
            <Label>Golden Safety Rules</Label>
            <Textarea rows={12} value={form.goldenRulesText} onChange={(e) => setForm((p) => ({ ...p, goldenRulesText: e.target.value }))} />
          </div>

          <Button onClick={handleSave} disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save QHSE Policy
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
