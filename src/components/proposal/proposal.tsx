import Header from "./Header";
import InfoSection from "./InfoSection";
import ObjectivesSection from "./ObjectivesSection";

export default function Proposal() {
  return (
    <form className="w-a4 border-2 border-level-1 rounded px-7 py-10 flex flex-col gap-8">
      <Header />
      <InfoSection />
      <ObjectivesSection />
      <ObjectivesSection />
    </form>
  );
}
