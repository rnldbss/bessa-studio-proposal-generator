import Header from "./Header";
import InfoSection from "./InfoSection";
import ObjectivesSection from "./ObjectivesSection";

export default function Proposal() {
  return (
    <form className="w-a4">
      <Header />
      <InfoSection />
      <ObjectivesSection />
    </form>
  );
}
