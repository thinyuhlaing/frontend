import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "motion/react";
import Link from "next/link";

export default function AccountCard({
  title,
  description,
  icon,
  delay,
  href,
}: any) {
  return (
    <Link href={href}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        whileHover={{ y: -4 }}
        className="flex items-start p-6 bg-[#f8f9fa] rounded-xl border border-transparent hover:border-gray-200 hover:bg-white transition-colors cursor-pointer group w-full"
      >
        <div className="mr-5 bg-white p-4 rounded-xl shadow-sm flex items-center justify-center w-14 h-14 text-(--primary) group-hover:scale-110 transition-transform">
          <FontAwesomeIcon icon={icon} className="text-2xl" />
        </div>

        <div>
          <h3 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-(--primary) transition-colors">
            {title}
          </h3>

          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
