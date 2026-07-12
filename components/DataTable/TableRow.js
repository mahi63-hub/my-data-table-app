import React from 'react';

export const TableRow = React.memo(({ row, index }) => {
  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status] || 'bg-blue-100 text-blue-800';
  };

  // Fixed column widths - MUST MATCH TableHeader exactly
  const columnWidths = {
    id: 'w-[60px] min-w-[60px] max-w-[60px]',
    name: 'w-[25%] min-w-[200px]',
    category: 'w-[18%] min-w-[150px]',
    value: 'w-[15%] min-w-[120px]',
    status: 'w-[15%] min-w-[120px]',
    date: 'w-[15%] min-w-[130px]',
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-150">
      <td className="w-[50px] min-w-[50px] max-w-[50px] px-4 py-3 text-sm text-gray-500">
        {index + 1}
      </td>
      <td className={`${columnWidths.name} px-4 py-3 text-sm font-medium text-gray-900 truncate`}>
        {row.name}
      </td>
      <td className={`${columnWidths.category} px-4 py-3 text-sm text-gray-600 truncate`}>
        {row.category}
      </td>
      <td className={`${columnWidths.value} px-4 py-3 text-sm font-mono font-semibold text-gray-900`}>
        ${row.value.toFixed(2)}
      </td>
      <td className={`${columnWidths.status} px-4 py-3`}>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      </td>
      <td className={`${columnWidths.date} px-4 py-3 text-sm text-gray-500`}>
        {row.date}
      </td>
    </tr>
  );
});

TableRow.displayName = 'TableRow';