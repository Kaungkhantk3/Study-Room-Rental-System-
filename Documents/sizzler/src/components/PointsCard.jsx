export default function PointsCard({ points }) {
  return (
    <section className="px-4 -mt-6">
      <div className="rounded-2xl bg-white p-5 shadow-sm flex items-center justify-between">
        <div className="text-center w-full">
          <p className="text-sm text-gray-500">Current Points</p>
          <div className="mt-1 flex items-center justify-center gap-2">
            <span className="text-3xl font-bold">{points}</span>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-sm font-semibold text-green-700">
              P
            </span>
          </div>
        </div>
        <button className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange-400 text-white">
          ›
        </button>
      </div>
    </section>
  );
}
