import './styles.css';
import { headers } from './mocks';
import { useEffect, useReducer, useMemo } from 'react';
import debounce from '../../utils/debounce';
import TableError from './TableError';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFilters from './TableFilters';
import tableReducer, { initialState } from '../../utils/tableReducer';
import { useFetchCars } from '../../hooks/useFetchCars';

const QuickTableAlternative = () => {
  const [state, dispatch] = useReducer(tableReducer, initialState);

  const fetchCars = useFetchCars(dispatch);

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
    fetchCars({
      searchColumn: state.search.column,
      searchValue: state.debouncedSearchValue,
      sortColumn: state.sorting.column,
      sortOrder: state.sorting.order as 'asc' | 'desc'
    });
  }, [
    fetchCars,
    state.search.column,
    state.debouncedSearchValue,
    state.sorting.column,
    state.sorting.order
  ]);

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
      <div className="table-controls">
        <TableFilters search={state.search} setSearch={handleSetSearch} headers={headers} />
      </div>
      
      <table className="quick-table">
        <TableHeader setSorting={handleSetSorting} isDescSorting={isDescSorting} isAscSorting={isAscSorting} />
        <TableBody cars={state.cars} loading={state.loading} headers={headers} />
      </table>
    </>
  );
};

export default QuickTableAlternative;