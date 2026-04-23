"use client";

import KanbanView from "@/modules/base/components/KanbanView";
import TableListView from "@/modules/base/components/TableListView";
import { faBars, faTableColumns } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

interface ViewSwitcherProps {
  listViewProps: Record<string, any>;
  KanbanViewComponent: React.ComponentType<any>;
  kanbanViewProps: Record<string, any>;
}

export default function ViewSwitcher({
  listViewProps = {},
  KanbanViewComponent,
  kanbanViewProps,
}: ViewSwitcherProps) {
  const [view, setView] = useState<"list" | "kanban">("list");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentView = isMobile ? "kanban" : view;

  return (
    <>
      {/* Toggle Buttons - hide on mobile */}
      {!isMobile && (
        <div className="flex gap-2 mb-6 justify-end">
          <div className="relative group">
            <FontAwesomeIcon
              icon={faBars}
              className={` text-black p-2 cursor-pointer border ${view === "list"
                ? "bg-(--primary)/20 border-(--primary)/50 "
                : "bg-gray-200 border-white"
                }`}
              onClick={() => setView("list")}
            />
            <span
              className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2
              bg-black text-white text-xs rounded px-2 py-1 opacity-0 
              group-hover:opacity-100 transition-opacity"
            >
              List
            </span>
          </div>

          <div className="relative group">
            <FontAwesomeIcon
              icon={faTableColumns}
              className={` text-black p-2 cursor-pointer border ${view === "kanban"
                ? "bg-(--primary)/20 border-(--primary)/50 "
                : "bg-gray-200 border-white"
                }`}
              onClick={() => setView("kanban")}
            />
            <span
              className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2
              bg-black text-white text-xs rounded px-2 py-1 opacity-0 
              group-hover:opacity-100 transition-opacity"
            >
              Kanban
            </span>
          </div>
        </div>
      )}

      {/* Views */}
      {currentView === "list" ? (
        <TableListView columns={listViewProps.columns} rows={listViewProps.rows} />
      ) : (
        <KanbanView CardComponent={KanbanViewComponent} items={kanbanViewProps.items} />
      )}
    </>
  );
}
