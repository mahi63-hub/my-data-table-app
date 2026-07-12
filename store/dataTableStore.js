import { create } from 'zustand';

export const useDataTableStore = create((set, get) => ({
  originalData: [],
  displayData: [],
  filters: {},
  sortColumn: null,
  sortDirection: null,
  isLoading: false,
  error: null,

  initializeData: (data) => {
    set({ 
      originalData: data, 
      displayData: data,
      isLoading: false,
      error: null
    });
  },

  setFilter: (column, value) => {
    set((state) => ({
      filters: { ...state.filters, [column]: value },
      isLoading: true,
    }));
    get().applyFiltersAndSort();
  },

  setSort: (column) => {
    set((state) => {
      let newDirection = 'asc';
      if (state.sortColumn === column) {
        if (state.sortDirection === 'asc') newDirection = 'desc';
        else if (state.sortDirection === 'desc') newDirection = null;
      }
      return {
        sortColumn: column,
        sortDirection: newDirection,
        isLoading: true,
      };
    });
    get().applyFiltersAndSort();
  },

  applyFiltersAndSort: () => {
    const { originalData, filters, sortColumn, sortDirection } = get();
    
    let processed = [...originalData];
    
    Object.entries(filters).forEach(([column, value]) => {
      if (value && value.trim() !== '') {
        const filterValue = value.toLowerCase().trim();
        processed = processed.filter((row) => {
          const rowValue = String(row[column]).toLowerCase();
          return rowValue.includes(filterValue);
        });
      }
    });

    if (sortColumn && sortDirection) {
      processed.sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        return sortDirection === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
      });
    }

    set({
      displayData: processed,
      isLoading: false,
      error: null,
    });
  },

  clearFilters: () => {
    set({ filters: {} });
    get().applyFiltersAndSort();
  },
}));