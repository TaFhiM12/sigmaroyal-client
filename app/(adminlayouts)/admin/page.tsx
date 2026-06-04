import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const quickLinks = [
  {
    title: "HYTORC Content",
    description: "Manage section pages and product cards for all HYTORC menus.",
    url: "/admin/hytorc",
    cta: "Open HYTORC Manager",
  },
  {
    title: "QHSE Policy",
    description: "Edit QHSE policy page banner, statements, and golden safety rules.",
    url: "/admin/qhse-policy",
    cta: "Edit QHSE Policy",
  },
  {
    title: "Projects",
    description: "Maintain projects shown on the website.",
    url: "/admin/projects",
    cta: "Manage Projects",
  },
  {
    title: "Certifications",
    description: "Manage compliance and certification listings.",
    url: "/admin/certifications",
    cta: "Manage Certifications",
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-zinc-900">Admin Dashboard</h1>
        <p className="text-zinc-600 mt-1">Control your industrial website content from one place.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {quickLinks.map((item) => (
          <Card key={item.title} className="border-zinc-200">
            <CardHeader>
              <CardTitle className="text-xl">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href={item.url}>{item.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
