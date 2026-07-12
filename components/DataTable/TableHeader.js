import React from 'react';

export const TableHeader = React.memo(({ columns, sortColumn, sortDirection, onSort }) => {
  const getSortIcon = (columnKey) => {
    if (sortColumn !== columnKey) return <span className="ml-1 text-gray-300">↕</span>;
    if (sortDirection === 'asc') return <span className="ml-1 text-blue-600">↑</span>;
    if (sortDirection === 'desc') return <span className="ml-1 text-blue-600">↓</span>;
    return <span className="ml-1 text-gray-300">↕</span>;
  };

  // Fixed column widths - match these in TableRow
  const columnWidths = {
    id: 'w-[60px] min-w-[60px] max-w-[60px]',
    name: 'w-[25%] min-w-[200px]',
    category: 'w-[18%] min-w-[150px]',
    value: 'w-[15%] min-w-[120px]',
    status: 'w-[15%] min-w-[120px]',
    date: 'w-[15%] min-w-[130px]',
  };

  return (
    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
      <tr>
        <th className="w-[50px] min-w-[50px] max-w-[50px] px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
          #
        </th>
        {columns.map((col) => (
          <th
            key={col.key}
            className={`px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${columnWidths[col.key] || ''} ${col.sortable ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''}`}
            onClick={() => col.sortable && onSort(col.key)}
            aria-sort={sortColumn === col.key ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
          >
            <div className="flex items-center">
              {col.label}
              {col.sortable && getSortIcon(col.key)}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
});

TableHeader.displayName = 'TableHeader';