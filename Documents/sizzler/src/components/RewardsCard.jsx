import React from "react";

export default function CouponCard({
  image,
  title,
  expiry,
  points,
  status = "available",
}) {
  const isAvailable = status === "available";

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <div className="flex gap-3 p-3">
        {/* Coupon Image */}
        <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden bg-gray-200">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              No Image
            </div>
          )}
        </div>

        {/* Coupon Details */}
        <div className="flex-1 flex flex-col justify-between py-1">
          {/* Title */}
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">
            {title}
          </h3>

          {/* Expiry and Points */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Valid until</span>
              <span>{expiry}</span>
              <div className="flex items-center gap-1 ml-auto">
                <span className="text-base font-bold text-gray-800">
                  {points}
                </span>
                <div className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              disabled={!isAvailable}
              className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                isAvailable
                  ? "bg-[#D85539] text-white hover:bg-[#C54A3A]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isAvailable ? "Redeem Now" : "Sold Out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Demo component showing multiple coupons
function CouponCardDemo() {
  const coupons = [
    {
      id: 1,
      image: null,
      title:
        "Use 9 points to redeem all shrimp menu items (pitcher) for only 49 baht",
      expiry: "31/01/2569",
      points: 9,
      status: "available",
    },
    {
      id: 2,
      image: null,
      title: "Use 9 points to redeem tea with shrimp menu (pitcher) only...",
      expiry: "31/01/2569",
      points: 9,
      status: "available",
    },
    {
      id: 3,
      image: null,
      title: "Use 9 points to redeem green matcha tea (pitcher)...",
      expiry: "31/01/2569",
      points: 9,
      status: "available",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-md mx-auto space-y-4">
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} {...coupon} />
        ))}
      </div>
    </div>
  );
}
