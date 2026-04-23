"use client";

interface Props {
  columns: string[];
  rows: any[];
}

export default function ListView({ columns, rows }: Props) {
  return (
    <div className="bg-white  rounded-2xl shadow-lg   p-4 md:p-6">
      {/* For desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-(--primary) text-white text-left text-sm font-semibold uppercase tracking-wider">
              {columns.map((column) => (
                <th key={column} className="px-6 py-3">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((items, rowIndex) => (
              <tr
                key={rowIndex}
                className={`transition-all duration-200 ${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-(--primary)/10 cursor-pointer`}
              >
                {items.map((item: any, colIndex: number) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{item}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
