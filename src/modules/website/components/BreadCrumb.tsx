import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
interface BreadcrumbLink {
  name: string;
  href?: string;
  icon?: IconDefinition;
}

interface Props {
  items: BreadcrumbLink[];
}

export default function BreadCrumb({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              <Link
                href={item.href || ""}
                // href={item.href}
                className={`flex items-center gap-2 transition-colors duration-200 ${
                  isLast
                    ? "text-gray-800 cursor-default"
                    : "hover:text-gray-800"
                }`}
              >
                {item.icon && (
                  <FontAwesomeIcon icon={item.icon} className="text-xs" />
                )}
                <span>{item.name}</span>
              </Link>

              {!isLast && (
                <span className="mx-2 text-gray-400 font-light">/</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
