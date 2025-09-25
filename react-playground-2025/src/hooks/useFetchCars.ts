import { useCallback } from 'react';
import { Car } from '../components/QuickTable/types';

// Table action types
type TableAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CARS'; payload: Car[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SORTING'; payload: { column: string; order: string } }
  | { type: 'SET_SEARCH'; payload: { column: string; value: string } }
  | { type: 'SET_DEBOUNCED_SEARCH'; payload: string };

// Parameters for the fetch function
export interface FetchCarsParams {
  searchColumn: string;
  searchValue: string;
  sortColumn: string;
  sortOrder: 'asc' | 'desc';
}

// Hook that returns a memoized fetch function
export function useFetchCars(dispatch: React.Dispatch<TableAction>) {
  
  const fetchCars = useCallback(async (params: FetchCarsParams) => {
    const { searchColumn, searchValue, sortColumn, sortOrder } = params;
    
    const sortParam = sortOrder === 'desc' ? `-${sortColumn}` : sortColumn;
    const url = `/api/cars?${searchColumn}=${searchValue}&_sort=${sortParam}`;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    
    try {
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }
      
      const carsData: Car[] = await res.json();
      dispatch({ type: 'SET_CARS', payload: carsData });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  return fetchCars;
}