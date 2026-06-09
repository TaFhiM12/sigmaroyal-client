"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Plus, Save, Trash2, Wrench } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { getAdminAuthHeaders } from "@/lib/admin-auth";
import { HytorcCategory, HytorcProduct } from "@/types/hytorc";
import CloudinaryUpload from "../components/CloudinaryUpload";
import Image from "next/image";

interface CategoryFormState {
  id?: string;
  title: string;
  slug: string;
  breadcrumb: string;
  headline: string;
  description: string;
  highlight: string;
  sortOrder: number;
  isActive: boolean;
}

interface ProductFormState {
  id?: string;
  categoryId: string;
  name: string;
  imageUrl: string;
  targetUrl: string;
  sortOrder: number;
  isActive: boolean;
}

const emptyCategory: CategoryFormState = {
  title: "",
  slug: "",
  breadcrumb: "",
  headline: "",
  description: "",
  highlight: "",
  sortOrder: 0,
  isActive: true,
};

const emptyProduct: ProductFormState = {
  categoryId: "",
  name: "",
  imageUrl: "",
  targetUrl: "",
  sortOrder: 0,
  isActive: true,
};

export default function AdminHytorcPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState<HytorcCategory[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string>("");
  const [uploaderKey, setUploaderKey] = useState(0);

  const [categoryForm, setCategoryForm] = useState<CategoryFormState>(emptyCategory);
  const [productForm, setProductForm] = useState<ProductFormState>(emptyProduct);

  const activeCategory = useMemo(
    () => categories.find((item) => item.id === activeCategoryId) || null,
    [categories, activeCategoryId]
  );

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hytorc/categories?includeInactive=true`, {
        cache: "no-store",
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to fetch categories");

      setCategories(data.data);
      if (!activeCategoryId && data.data.length > 0) {
        setActiveCategoryId(data.data[0].id);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to load HYTORC data");
    } finally {
      setLoading(false);
    }
  }, [activeCategoryId]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const startEditCategory = (category: HytorcCategory) => {
    setCategoryForm({
      id: category.id,
      title: category.title,
      slug: category.slug,
      breadcrumb: category.breadcrumb,
      headline: category.headline,
      description: category.description,
      highlight: category.highlight || "",
      sortOrder: category.sortOrder,
      isActive: category.isActive,
    });
  };

  const resetCategoryForm = () => setCategoryForm(emptyCategory);

  const handleCategorySubmit = async () => {
    setSubmitting(true);
    try {
      const hasId = Boolean(categoryForm.id);
      const url = hasId
        ? `${process.env.NEXT_PUBLIC_API_URL}/hytorc/categories/${categoryForm.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/hytorc/categories`;

      const res = await fetch(url, {
        method: hasId ? "PUT" : "POST",
        headers: getAdminAuthHeaders(),
        body: JSON.stringify(categoryForm),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to save category");

      toast.success(hasId ? "Category updated" : "Category created");
      resetCategoryForm();
      await fetchCategories();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save category");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCategoryDelete = async (id: string) => {
    if (!confirm("Delete this category and its products?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hytorc/categories/${id}`, {
        method: "DELETE",
        headers: getAdminAuthHeaders(),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to delete");

      toast.success("Category deleted");
      if (activeCategoryId === id) setActiveCategoryId("");
      await fetchCategories();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete category");
    }
  };

  const startEditProduct = (product: HytorcProduct) => {
    setProductForm({
      id: product.id,
      categoryId: product.categoryId,
      name: product.name,
      imageUrl: product.imageUrl,
      targetUrl: product.targetUrl || "",
      sortOrder: product.sortOrder,
      isActive: product.isActive,
    });
    setUploaderKey((prev) => prev + 1);
  };

  const resetProductForm = () =>
    setProductForm({
      ...emptyProduct,
      categoryId: activeCategoryId,
    });

  const replaceCurrentImage = () => {
    setProductForm((prev) => ({ ...prev, imageUrl: "" }));
    setUploaderKey((prev) => prev + 1);
    toast.success("Current image cleared. Upload a new image now.");
  };

  useEffect(() => {
    setProductForm((prev) => ({ ...prev, categoryId: activeCategoryId || prev.categoryId }));
  }, [activeCategoryId]);

  const handleProductSubmit = async () => {
    if (!productForm.imageUrl) {
      toast.error("Please upload a product image first");
      return;
    }

    setSubmitting(true);
    try {
      const hasId = Boolean(productForm.id);
      const url = hasId
        ? `${process.env.NEXT_PUBLIC_API_URL}/hytorc/products/${productForm.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/hytorc/products`;

      const res = await fetch(url, {
        method: hasId ? "PUT" : "POST",
        headers: getAdminAuthHeaders(),
        body: JSON.stringify(productForm),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to save product");

      toast.success(hasId ? "Product updated" : "Product created");
      resetProductForm();
      await fetchCategories();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleHytorcImageUpload = (urls: string[]) => {
    if (!urls.length) return;

    setProductForm((prev) => ({
      ...prev,
      imageUrl: urls[0],
    }));

    toast.success("Image uploaded and assigned to product");
  };

  const handleProductDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hytorc/products/${id}`, {
        method: "DELETE",
        headers: getAdminAuthHeaders(),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Failed to delete product");

      toast.success("Product deleted");
      await fetchCategories();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete product");
    }
  };

  const handleSeed = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hytorc/seed-default`, {
        method: "POST",
        headers: getAdminAuthHeaders(),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Seed failed");

      toast.success(data.message || "Default data inserted");
      await fetchCategories();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to seed default data");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold text-[var(--brand-navy)]">HYTORC Content Manager</h1>
          <p className="text-[var(--brand-muted)] mt-1">Manage section pages, descriptions, and product cards.</p>
        </div>
        <Button onClick={handleSeed} variant="outline" className="border-[#b9cff0]">
          <Wrench className="h-4 w-4 mr-2" />
          Seed Default HYTORC Data
        </Button>
      </div>

      {loading ? (
        <div className="h-72 rounded-xl bg-[#eef4ff] animate-pulse" />
      ) : (
        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Select a category to manage products.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 max-h-130 overflow-y-auto">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`p-3 border rounded-lg transition-colors ${
                    activeCategoryId === category.id ? "border-red-500 bg-red-50" : "border-[#d8e4f5] bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      className="text-left"
                      onClick={() => setActiveCategoryId(category.id)}
                      type="button"
                    >
                      <p className="font-medium text-[var(--brand-navy)]">{category.title}</p>
                      <p className="text-xs text-[var(--brand-muted)] mt-1">/{category.slug}</p>
                    </button>
                    <Badge variant={category.isActive ? "default" : "secondary"}>
                      {category.isActive ? "Active" : "Hidden"}
                    </Badge>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => startEditCategory(category)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleCategoryDelete(category.id)}>
                      <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>{categoryForm.id ? "Edit Category" : "Create Category"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={categoryForm.title} onChange={(e) => setCategoryForm((p) => ({ ...p, title: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input value={categoryForm.slug} onChange={(e) => setCategoryForm((p) => ({ ...p, slug: e.target.value }))} placeholder="electric-torque-wrench" />
                </div>
                <div className="space-y-2">
                  <Label>Breadcrumb</Label>
                  <Input value={categoryForm.breadcrumb} onChange={(e) => setCategoryForm((p) => ({ ...p, breadcrumb: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Sort Order</Label>
                  <Input type="number" value={categoryForm.sortOrder} onChange={(e) => setCategoryForm((p) => ({ ...p, sortOrder: Number(e.target.value) }))} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Headline</Label>
                <Input value={categoryForm.headline} onChange={(e) => setCategoryForm((p) => ({ ...p, headline: e.target.value }))} />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea rows={5} value={categoryForm.description} onChange={(e) => setCategoryForm((p) => ({ ...p, description: e.target.value }))} />
              </div>

              <div className="space-y-2">
                <Label>Highlight (optional)</Label>
                <Input value={categoryForm.highlight} onChange={(e) => setCategoryForm((p) => ({ ...p, highlight: e.target.value }))} />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={categoryForm.isActive}
                  onCheckedChange={(checked) => setCategoryForm((p) => ({ ...p, isActive: checked }))}
                />
                <Label>Active</Label>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCategorySubmit} disabled={submitting}>
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Category
                </Button>
                <Button variant="outline" onClick={resetCategoryForm}>Reset</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Products {activeCategory ? `- ${activeCategory.title}` : ""}</CardTitle>
          <CardDescription>Add items to render in the category page grid.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {!activeCategory ? (
            <p className="text-sm text-[var(--brand-muted)]">Select a category first.</p>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={productForm.name} onChange={(e) => setProductForm((p) => ({ ...p, name: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Target URL (optional)</Label>
                  <Input value={productForm.targetUrl} onChange={(e) => setProductForm((p) => ({ ...p, targetUrl: e.target.value }))} placeholder="/hytorc/pumps" />
                </div>
                <div className="space-y-2">
                  <Label>Sort Order</Label>
                  <Input type="number" value={productForm.sortOrder} onChange={(e) => setProductForm((p) => ({ ...p, sortOrder: Number(e.target.value) }))} />
                </div>
                <div className="flex items-center gap-2 pt-8">
                  <Switch
                    checked={productForm.isActive}
                    onCheckedChange={(checked) => setProductForm((p) => ({ ...p, isActive: checked }))}
                  />
                  <Label>Active</Label>
                </div>
              </div>

              <div className="space-y-3 rounded-lg border border-[#d8e4f5] p-4 bg-[#f7faff]/60">
                <Label className="text-sm font-medium text-[var(--brand-navy)]">Upload Product Image (Cloudinary)</Label>
                <CloudinaryUpload
                  key={uploaderKey}
                  onUpload={handleHytorcImageUpload}
                  multiple={false}
                  maxFiles={1}
                  folder="royal-utilisation/hytorc"
                />
                {productForm.imageUrl ? (
                  <div className="space-y-3">
                    <div className="relative h-40 w-full max-w-sm rounded-lg overflow-hidden border border-[#d8e4f5] bg-white">
                      <Image
                        src={productForm.imageUrl}
                        alt="HYTORC product preview"
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    {productForm.id ? (
                      <Button type="button" variant="outline" size="sm" onClick={replaceCurrentImage}>
                        Replace Current Image
                      </Button>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div className="flex gap-2">
                <Button onClick={handleProductSubmit} disabled={submitting || !activeCategoryId}>
                  {productForm.id ? <Save className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                  {productForm.id ? "Update Product" : "Add Product"}
                </Button>
                <Button variant="outline" onClick={resetProductForm}>Reset</Button>
              </div>

              <div className="space-y-3">
                {activeCategory.products.length === 0 ? (
                  <p className="text-sm text-[var(--brand-muted)]">No products yet.</p>
                ) : (
                  activeCategory.products.map((product) => (
                    <div key={product.id} className="rounded-lg border border-[#d8e4f5] p-3 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-[var(--brand-navy)]">{product.name}</p>
                        <p className="text-xs text-[var(--brand-muted)] mt-1">order: {product.sortOrder}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => startEditProduct(product)}>Edit</Button>
                        <Button variant="destructive" size="sm" onClick={() => handleProductDelete(product.id)}>
                          <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
