import { EventStatus } from "@/types/event";

export default function StatusBadge({ status }: { status: EventStatus }) {
  const colorMap = {
    UPCOMING: "bg-blue-500/10 text-blue-400",
    ONGOING: "bg-green-500/10 text-green-400",
    COMPLETED: "bg-gray-500/10 text-gray-400",
    CANCELLED: "bg-red-500/10 text-red-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${colorMap[status]}`}
    >
      {status}
    </span>
  );
}
