import './styles.css';
import { headers } from '../mocks';
import { useEffect, useReducer, useMemo } from 'react';
import { Car } from '../types';
import debounce from '../../../utils/debounce';
import TableError from '../TableError';
import TableHeader from '../TableHeader';
import TableBody from '../TableBody';
import TableFilters from '../TableFilters';
import tableReducer, { initialState } from '../../../utils/tableReducer';

const QuickTable = () => {
  const [state, dispatch] = useReducer(tableReducer, initialState);

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => {
      dispatch({ type: 'SET_DEBOUNCED_SEARCH', payload: value });
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSetSearch(state.search.value);
  }, [state.search.value, debouncedSetSearch]);

  useEffect(() => {
    const sortParam = state.sorting.order === 'desc' ? `-${state.sorting.column}` : state.sorting.column;
    const url = `/api/cars?${state.search.column}=${state.debouncedSearchValue}&_sort=${sortParam}`;

    const fetchCars = async () => {
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
    };

    fetchCars();
  }, [state.sorting.column, state.sorting.order, state.search.column, state.debouncedSearchValue]);

  const isDescSorting = (column: string) => state.sorting.column === column && state.sorting.order === 'desc';
  const isAscSorting = (column: string) => state.sorting.column === column && state.sorting.order === 'asc';

  const handleSetSearch = (search: { column: string; value: string }) => {
    dispatch({ type: 'SET_SEARCH', payload: search });
  };

  const handleSetSorting = (sorting: { column: string; order: string }) => {
    dispatch({ type: 'SET_SORTING', payload: sorting });
  };

  if (state.error) return <TableError error={state.error} />;

  return (
    <>
      <TableFilters search={state.search} setSearch={handleSetSearch} headers={headers} />
      <table className="quick-table">
        <TableHeader setSorting={handleSetSorting} isDescSorting={isDescSorting} isAscSorting={isAscSorting} />
        <TableBody cars={state.cars} loading={state.loading} headers={headers} />
      </table>
    </>
  );
}

export default QuickTable;
