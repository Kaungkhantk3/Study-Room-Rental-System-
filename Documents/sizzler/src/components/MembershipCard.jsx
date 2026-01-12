export default function MembershipCard({ tier, current, max }) {
  const progress = Math.min((current / max) * 100, 100);

  return (
    <div className="mt-4 rounded-2xl bg-[#D1D1D1] p-4 text-gray-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">{tier}</p>
          <p className="text-xs text-gray-600">Membership Level</p>
        </div>
        <button className="rounded-lg border border-gray-400 px-3 py-1 text-xs">
          View Privileges
        </button>
      </div>

      <p className="mt-3 text-xs">
        Collect {max - current} more points to maintain {tier}
      </p>

      <div className="mt-2 h-2 w-full rounded-full bg-gray-300 overflow-hidden">
        <div className="h-full bg-gray-600" style={{ width: `${progress}%` }} />
      </div>

      <p className="mt-1 text-center text-xs">
        {current} / {max}
      </p>
    </div>
  );
}
