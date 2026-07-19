import Image from "next/image";
import Link from "next/link";
import { Award } from "lucide-react";
import { teamCategories } from "@/app/data/team";
import { cn } from "@/lib/utils";
import { TeamCategory, TeamMember } from "@/types/team";

type TeamDirectoryProps = {
  members: TeamMember[];
  activeCategory: TeamCategory;
};

export default function TeamDirectory({ members, activeCategory }: TeamDirectoryProps) {
  return (
    <main className="site-canvas">
      <section className="border-b border-[#d8e4f5] bg-transparent">
        <div className="mx-auto max-w-screen-2xl px-4 py-5 md:px-6 lg:px-8">
          <div className="flex flex-col gap-4 rounded-xl border border-[#d8e4f5] bg-[#f7faff] p-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-(--brand-navy)">
                {activeCategory.label}
              </p>
              <p className="mt-1 text-sm text-(--brand-muted)">{members.length} team members</p>
            </div>

            <nav className="flex flex-wrap gap-2" aria-label="Team categories">
              {teamCategories.map((category) => {
                const href = category.slug === "all" ? "/team" : `/team/${category.slug}`;
                const active = activeCategory.slug === category.slug;

                return (
                  <Link
                    key={category.slug}
                    href={href}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs font-extrabold uppercase tracking-[0.08em] transition-all duration-200",
                      active
                        ? "border-[var(--brand-red)] bg-[var(--brand-red)] text-white shadow-lg shadow-[rgb(227_6_19_/_0.16)]"
                        : "border-[#d8e4f5] bg-white text-(--brand-navy) hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)]"
                    )}
                  >
                    {category.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </section>

      <section className="bg-transparent">
        <div className="mx-auto max-w-screen-2xl px-4 py-10 md:px-6 lg:px-8 lg:py-12">
        {members.length ? (
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {members.map((member) => (
              <article
                key={member.id}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative h-44 w-44 rounded-full bg-linear-to-br from-[#eef4ff] via-white to-[#d8e4f5] p-2 shadow-[0_16px_38px_rgb(8_32_74_/_0.10)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_22px_46px_rgb(8_32_74_/_0.15)]">
                  <div className="relative h-full w-full overflow-hidden rounded-full bg-[#eef4ff] ring-1 ring-white">
                    <Image
                      src={member.photoUrl}
                      alt={member.name}
                      fill
                      sizes="176px"
                      className="object-cover object-[center_18%] transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span className="absolute bottom-3 left-2 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-[var(--brand-red)] text-white shadow-lg shadow-[rgb(227_6_19_/_0.22)]">
                    <Award className="h-4 w-4" />
                  </span>
                </div>

                <h2 className="mt-5 max-w-[14rem] text-base font-extrabold uppercase leading-tight tracking-[0.08em] text-(--brand-navy)">
                  {member.name}
                </h2>
                <p className="mt-2 max-w-[14rem] text-xs font-extrabold uppercase leading-snug tracking-[0.08em] text-[var(--brand-blue)]">
                  {member.designation}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="brand-card py-16 text-center">
            <h2 className="text-2xl font-extrabold text-(--brand-navy)">No team members found</h2>
            <p className="mt-2 text-(--brand-muted)">Add people from the admin panel to show them here.</p>
          </div>
        )}
        </div>
      </section>
    </main>
  );
}
