import AreaOfExpertise from "@/app/components/Home/AreaOfExperties";
import { getPageContent } from "@/lib/page-content";

export const metadata = {
  title: "Areas of Expertise",
  description:
    "Explore Royal and Sigma capabilities across oil and gas, power, process plants, pipeline construction, HDD and engineering services.",
};

export default async function ExpertisePage() {
  const content = await getPageContent("expertise");

  return (
    <AreaOfExpertise
      className="py-8 md:py-12"
      heading={content?.introTitle || undefined}
      description={content?.introBody || undefined}
      showHeader={false}
    />
  );
}
