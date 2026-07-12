import { useDataTableStore } from '@/store/dataTableStore';
import { generateMockData } from '@/utils/generateMockData';

describe('DataTable Store', () => {
  beforeEach(() => {
    // Reset store state
    const store = useDataTableStore.getState();
    store.initializeData([]);
  });

  test('should initialize with data', () => {
    const mockData = generateMockData(10);
    const store = useDataTableStore.getState();
    
    store.initializeData(mockData);
    
    // Get fresh state after initialization
    const updatedStore = useDataTableStore.getState();
    expect(updatedStore.displayData).toHaveLength(10);
    expect(updatedStore.originalData).toHaveLength(10);
  });

  test('should filter data correctly', () => {
    const mockData = generateMockData(10);
    const store = useDataTableStore.getState();
    
    store.initializeData(mockData);
    store.setFilter('name', 'Product');
    
    const updatedStore = useDataTableStore.getState();
    expect(updatedStore.filters.name).toBe('Product');
  });

  test('should sort data correctly', () => {
    const mockData = generateMockData(5);
    const store = useDataTableStore.getState();
    
    store.initializeData(mockData);
    store.setSort('value');
    
    const updatedStore = useDataTableStore.getState();
    expect(updatedStore.sortColumn).toBe('value');
    expect(updatedStore.sortDirection).toBe('asc');
  });

  test('should clear filters', () => {
    const mockData = generateMockData(10);
    const store = useDataTableStore.getState();
    
    store.initializeData(mockData);
    store.setFilter('name', 'test');
    store.clearFilters();
    
    const updatedStore = useDataTableStore.getState();
    expect(updatedStore.filters).toEqual({});
  });
});
