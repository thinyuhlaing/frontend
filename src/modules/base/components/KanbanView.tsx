"use client";

import Link from "next/link";

interface KanbanViewProps {
  CardComponent: React.ComponentType<{ item: any }>;
  items: any[];
}

// Reuse the same status logic as your TableListView

export default function KanbanView({ items, CardComponent }: KanbanViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <CardComponent key={item.id} item={item} />
      ))}
    </div>
  );
}
