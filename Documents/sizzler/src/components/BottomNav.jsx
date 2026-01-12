import { Home, Gift, Ticket, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function BottomNav({ active = "/" }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
      <div className="flex justify-around items-center py-3">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 p-3 rounded-lg transition ${
            active === "/" ? "text-purple-500" : "text-gray-500"
          }`}
        >
          <Home size={24} />
          <span className="text-xs font-semibold">Home</span>
        </Link>

        <Link
          to="/privileges"
          className={`flex flex-col items-center gap-1 p-3 rounded-lg transition ${
            active === "/privileges" ? "text-purple-500" : "text-gray-500"
          }`}
        >
          <Gift size={24} />
          <span className="text-xs font-semibold">Privileges</span>
        </Link>

        <Link
          to="/coupons"
          className={`flex flex-col items-center gap-1 p-3 rounded-lg transition ${
            active === "/coupons" ? "text-purple-500" : "text-gray-500"
          }`}
        >
          <Ticket size={24} />
          <span className="text-xs font-semibold">Coupons</span>
        </Link>

        <Link
          to="/more"
          className={`flex flex-col items-center gap-1 p-3 rounded-lg transition ${
            active === "/more" ? "text-purple-500" : "text-gray-500"
          }`}
        >
          <Menu size={24} />
          <span className="text-xs font-semibold">More</span>
        </Link>
      </div>
    </nav>
  );
}
