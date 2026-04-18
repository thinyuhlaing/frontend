import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  title: string;
  message: string;
}

export default function EmptyState({ message, title }: Props) {
  return (
    <div className="flex min-h-[400px]   w-full flex-col items-center justify-center rounded-xl  border-gray-200  p-12 text-center animate-in fade-in duration-500">
      {/* Icon with a soft background glow */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
        <FontAwesomeIcon icon={faMailBulk} />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-gray-900">{title}</h3>

      <p className="mx-auto mt-2 max-w-xs text-sm text-gray-500">{message}</p>
    </div>
  );
}
