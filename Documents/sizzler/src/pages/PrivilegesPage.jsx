import BottomNav from "../components/BottomNav";
import Header from "../components/Header";
import PointsCard from "../components/PointsCard";
import RewardsCard from "../components/RewardsCard";
import LuckyWheel from "../assets/images/lucky_wheel.png";
import Reward1 from "../assets/images/reward1.jpeg";
import Reward2 from "../assets/images/reward2.jpeg";
import { Link } from "react-router-dom";

export default function PrivilegesPage() {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-slate-100 flex flex-col">
      <Header userName="Mr.Jason" />
      <div className="px-6 mt-8">
        <PointsCard points={102} />
      </div>

      <main className="flex-1 px-4 py-6 space-y-6">
        <Link to="/luckywheel">
          <RewardsCard
            image={LuckyWheel}
            title="Use 9 points to redeem Lucky Wheel Spin for a chance to win prizes"
            expiry="31/01/2569"
            points={9}
            status="available"
          />
        </Link>
        <RewardsCard
          image={Reward1}
          title="Use 9 points to redeem Lemon Tea for only 39 baht"
          expiry="31/01/2569"
          points={9}
          status="available"
        />
        <RewardsCard
          image={Reward2}
          title="Use 9 points to redeem an ice cream for only 29 baht"
          expiry="31/01/2569"
          points={9}
          status="available"
        />
      </main>

      <BottomNav active="/privileges" />
    </div>
  );
}
