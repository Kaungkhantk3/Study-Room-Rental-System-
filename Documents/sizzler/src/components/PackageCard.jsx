export default function PackageCard() {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold text-gray-700">Packages</h2>
      <div className="rounded-xl bg-[#E3ECE7] p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
          📦
        </div>
        <div>
          <p className="text-sm font-semibold">Coupon Package</p>
          <p className="text-xs text-gray-600">
            Purchase coupons and receive special offers
          </p>
        </div>
        <span className="ml-auto rounded bg-red-500 px-2 py-0.5 text-xs text-white">
          NEW
        </span>
      </div>
    </div>
  );
}
