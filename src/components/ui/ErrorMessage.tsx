import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface Props {
  message?: string;
}

export default function ErrorMessage({
  message = "Something went wrong.",
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-red-600">
      <ExclamationTriangleIcon className="w-10 h-10 mb-2 text-red-500" />
      <p className="text-lg font-medium">{message}</p>
      <p className="text-sm text-red-400">Please try again later.</p>
    </div>
  );
}
