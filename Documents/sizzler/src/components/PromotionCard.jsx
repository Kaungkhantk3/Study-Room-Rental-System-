export default function PromotionCard() {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold text-gray-700">
        Special Promotions
      </h2>
      <div className="rounded-xl bg-green-800 p-4 text-white">
        <p className="text-lg font-bold">9 Points Special</p>
        <p className="text-xs mt-1">Exclusive for Members</p>
        <button className="mt-3 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-green-800">
          Read More
        </button>
      </div>
    </div>
  );
}
