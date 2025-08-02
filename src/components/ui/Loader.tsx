import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-black">
      <ArrowPathIcon className="w-8 h-8 animate-spin text-secondary mb-2" />
      <p className="text-sm">Loading, please wait...</p>
    </div>
  );
}
