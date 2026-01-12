import BottomNav from "../components/BottomNav";

export default function MorePage() {
  return (
    <div className="mx-auto min-h-screen max-w-md flex flex-col items-center justify-center">
      <h1 className="text-xl font-semibold text-gray-600">More</h1>
      <BottomNav active="/privileges" />
    </div>
  );
}