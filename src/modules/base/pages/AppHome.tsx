"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";
// import { useTenant } from "@/modules/website/utils/tenant"; // adjust import
// import { allModules } from "@/modules/website/utils/modules"; // adjust import
import { useState } from "react";
import { useTenant } from "@/lib/tenant";
import { allModules } from "@/registry";

const colorMap: Record<string, string> = {
  base: "bg-slate-100 text-slate-600",
  hr_attendance: "bg-amber-50 text-amber-600",
  website: "bg-sky-50 text-sky-600",
  blog: "bg-violet-50 text-violet-600",
  default: "bg-purple-50 text-(--primary)",
};

export default function AppsGrid() {
  const tenant = useTenant();
  const [enabledFeatures, setEnabledFeatures] = useState(
    tenant.enabledFeatures,
  );

  const toggleModule = (moduleId: string) => {
    setEnabledFeatures((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId],
    );
  };

  const getModuleColor = (id: string) => colorMap[id] || colorMap.default;

  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          App Directory
        </h1>
        <p className="text-gray-500 mt-2">
          Activate modules to power up your business workflow.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {allModules.map((module, i) => {
          const colorClass = getModuleColor(module.id);
          const isEnabled = enabledFeatures.includes(module.id);

          return (
            <div
              key={module.id || i}
              className={`group relative bg-white border border-gray-200 rounded-2xl p-5 
                         transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 
                         hover:-translate-y-1 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl ${colorClass} transition-transform group-hover:scale-110`}
                  >
                    <FontAwesomeIcon
                      icon={module.icon || faCube}
                      className="w-5 h-5"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    {module.id === "base" ? "System" : "Module"}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-(--primary) transition-colors">
                  {module.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-2">
                  {module.description ||
                    "Manage your " + module.name + " operations."}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <button
                  onClick={() => toggleModule(module.id)}
                  className={`flex-1 text-xs font-semibold py-2.5 rounded-lg shadow-sm transition-colors
                    ${
                      isEnabled
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-900 text-white hover:bg-(--primary)"
                    }`}
                >
                  {isEnabled ? "Enabled" : "Activate"}
                </button>
                {/* <button
                  className="px-3 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900 
                                 hover:bg-gray-100 rounded-lg transition-all"
                >
                  Details
                </button> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
