'use client';

import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useDataTableStore } from '@/store/dataTableStore';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { FilterBar } from './FilterBar';

const columns = [
  { key: 'id', label: 'ID', sortable: false },
  { key: 'name', label: 'Product Name', sortable: true },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'value', label: 'Value', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
];

const filterableColumns = columns.filter(col => ['name', 'category', 'status'].includes(col.key));

const DataTable = () => {
  const { displayData, isLoading, sortColumn, sortDirection, setSort, error } = useDataTableStore();
  const tableRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: displayData.length,
    getScrollElement: () => tableRef.current,
    estimateSize: () => 52,
    overscan: 5,
  });

  if (isLoading && displayData.length === 0) {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm p-4">
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 rounded h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        <p>Error loading data: {error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Retry
        </button>
      </div>
    );
  }

  if (displayData.length === 0) {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <FilterBar filterableColumns={filterableColumns} />
        <div className="p-8 text-center text-gray-500">No data found</div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      <FilterBar filterableColumns={filterableColumns} />
      <div className="overflow-x-auto">
        <div ref={tableRef} className="relative overflow-y-auto" style={{ height: '500px' }}>
          <table className="w-full border-collapse table-fixed">
            <TableHeader 
              columns={columns} 
              sortColumn={sortColumn} 
              sortDirection={sortDirection} 
              onSort={setSort} 
            />
            <tbody>
              <tr>
                <td colSpan={columns.length + 1} style={{ padding: 0 }}>
                  <div style={{ height: rowVirtualizer.getTotalSize() + 'px', width: '100%', position: 'relative' }}>
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                      const row = displayData[virtualRow.index];
                      if (!row) return null;
                      return (
                        <div
                          key={virtualRow.key}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: virtualRow.size + 'px',
                            transform: 'translateY(' + virtualRow.start + 'px)',
                          }}
                        >
                          <TableRow row={row} index={virtualRow.index} />
                        </div>
                      );
                    })}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-sm text-gray-600 flex justify-between">
        <span>Showing {displayData.length} rows</span>
        <span>Virtualized for performance</span>
      </div>
    </div>
  );
};

export default DataTable;