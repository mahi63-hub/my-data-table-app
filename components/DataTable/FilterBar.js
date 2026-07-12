import React, { useState, useRef } from 'react';
import { useDataTableStore } from '@/store/dataTableStore';

export const FilterBar = ({ filterableColumns }) => {
  const { filters, setFilter, clearFilters } = useDataTableStore();
  const [localFilters, setLocalFilters] = useState(filters);
  const timeoutRef = useRef(null);

  const handleFilterChange = (column, value) => {
    setLocalFilters(prev => ({ ...prev, [column]: value }));
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setFilter(column, value);
    }, 300);
  };

  const hasActiveFilters = Object.values(filters).some(v => v && v.trim() !== '');

  return (
    <div className="flex flex-wrap gap-3 p-4 bg-white border-b border-gray-200">
      {filterableColumns.map((col) => (
        <div key={col.key} className="flex-1 min-w-[150px] max-w-[250px]">
          <input
            type="text"
            placeholder={`Filter ${col.label}...`}
            value={localFilters[col.key] || ''}
            onChange={(e) => handleFilterChange(col.key, e.target.value)}
            className="w-full px-3 py-2 text-sm text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500 caret-black font-medium"
            aria-label={`Filter by ${col.label}`}
          />
        </div>
      ))}
      <button
        onClick={clearFilters}
        disabled={!hasActiveFilters}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
          hasActiveFilters 
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
            : 'bg-gray-50 text-gray-400 cursor-not-allowed'
        }`}
      >
        Clear Filters
      </button>
    </div>
  );
};