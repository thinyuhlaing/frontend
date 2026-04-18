"use client";
import { useState } from "react";

interface TabItem {
  key: string;
  label: string;
  content: React.ReactNode;
}

interface FormTemplateProps {
  title?: string;
  children?: React.ReactNode;
  tabs?: TabItem[];
}

const FormTemplate: React.FC<FormTemplateProps> = ({
  title = "Draft",
  children,
  tabs = [],
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || "");

  return (
    <div className="p-4 md:p-6 bg-slate-50/30 min-h-screen">
      {/* --- Main Sheet --- */}
      <div className=" bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-200/50 overflow-hidden">
        {" "}
        <div className="p-6 md:p-10">
          {/* Header */}
          <div className="mb-10">
            <div className="text-slate-400 text-[10px] uppercase mb-2">
              Customer Invoice
            </div>

            <h1 className="text-5xl font-black">{title}</h1>

            <div className="mt-10">{children}</div>
          </div>

          {/* Tabs */}
          {tabs.length > 0 && (
            <>
              <div className="mb-8 border-b">
                <div className="flex gap-10">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`pb-4 text-[11px] font-black uppercase ${
                        activeTab === tab.key
                          ? "text-slate-900"
                          : "text-slate-400"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="min-h-[300px]">
                {tabs.find((t) => t.key === activeTab)?.content}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormTemplate;
