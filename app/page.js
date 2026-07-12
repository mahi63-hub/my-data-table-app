'use client';

import React, { useEffect, useState } from 'react';
import DataTable from '@/components/DataTable';
import { useDataTableStore } from '@/store/dataTableStore';
import { generateMockData } from '@/utils/generateMockData';

export default function Home() {
  const { initializeData } = useDataTableStore();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const data = generateMockData(10000);
      initializeData(data);
      setLoaded(true);
    }
  }, [initializeData, loaded]);

  if (!loaded) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Generating 10,000 rows of data...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Performance Data Table
          </h1>
          <p className="text-gray-600 mt-1">
            Virtualized table with 10,000+ rows • Zustand state management
          </p>
        </div>
        <DataTable />
      </div>
    </main>
  );
}