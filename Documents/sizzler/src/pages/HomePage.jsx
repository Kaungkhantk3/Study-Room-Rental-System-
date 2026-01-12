import Header from "../components/Header";
import MembershipCard from "../components/MembershipCard";
import PointsCard from "../components/PointsCard";
import PackageCard from "../components/PackageCard";
import PromotionCard from "../components/PromotionCard";
import BottomNav from "../components/BottomNav";

export default function PrivilegesPage() {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-slate-100 flex flex-col">
      <Header userName="Jason" />

      <div className="px-6 -mt-8">
        <MembershipCard tier="DIAMOND" current={123} max={300} />
      </div>

      <div className="px-6 mt-8">
        <PointsCard points={102} />
      </div>
      <main className="flex-1 px-4 py-6 space-y-6">
        <PackageCard />
        <PromotionCard />
      </main>

      <BottomNav active="/" />
    </div>
  );
}
