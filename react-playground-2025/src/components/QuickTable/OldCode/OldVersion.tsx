import './styles.css';
import { headers } from '../mocks';
import { useEffect, useState, useMemo } from 'react';
import { Car } from '../types';
import debounce from '../../../utils/debounce';

const QuickTable = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [sorting, setSorting] = useState({ column: 'MAKE', order: 'asc' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState({ column: 'MAKE', value: '' });
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => {
      setDebouncedSearchValue(value);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSetSearch(search.value);
  }, [search.value, debouncedSetSearch]);

  useEffect(() => {
    const sortParam = sorting.order === 'desc' ? `-${sorting.column}` : sorting.column;
    const url = `/api/cars?${search.column}=${debouncedSearchValue}&_sort=${sortParam}`;

    const fetchCars = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const res = await fetch(url);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
        
        const carsData: Car[] = await res.json();
        setCars(carsData);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [sorting.column, sorting.order, search.column, debouncedSearchValue]);

  const isDescSorting = (column: string) => sorting.column === column && sorting.order === 'desc';
  const isAscSorting = (column: string) => sorting.column === column && sorting.order === 'asc';

  const handleSearch = (value: string) => {
    setSearch({ ...search, value });
  };

  if (error) {
    return (
      <div className="error-message" style={{ color: 'red', padding: '20px', textAlign: 'center' }}>
        <h3>Error loading data</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', alignItems: 'center' }}>
        <select
          className='quick-table__select'
          value={search.column} 
          onChange={(e) => setSearch({ ...search, column: e.target.value })}
        >
          {headers.map((header) => (
            <option key={header.KEY} value={header.KEY} style={{ color: '#333', backgroundColor: 'white' }}>
              Search in {header.LABEL}
            </option>
          ))}
        </select>
        
        <input
          className='quick-table__search-text'
          type="text" 
          placeholder={`Search in ${headers.find(h => h.KEY === search.column)?.LABEL}...`}
          value={search.value}
          onChange={ (e) => handleSearch(e.target.value)}
        />
        
        {search.value && (
          <span style={{ fontSize: '12px', color: '#666' }}>
            Searching for "{search.value}" in {headers.find(h => h.KEY === search.column)?.LABEL}
          </span>
        )}
      </div>
      <table className="quick-table">
        <thead className="quick-table__header">
          <tr>
            {headers.map((header) => (
              <th key={header.KEY} onClick={() => setSorting({ column: header.KEY, order: isDescSorting(header.KEY) ? 'asc' : 'desc' })}>
                <span className="quick-table__header-label">{header.LABEL}</span>
                {isDescSorting(header.KEY) && <span>▾</span>}
                {isAscSorting(header.KEY) && <span>▴</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="quick-table__body">
          {loading ? (
            <tr>
              <td colSpan={headers.length} style={{ textAlign: 'center', padding: '20px' }}>
                Loading...
              </td>
            </tr>
          ) : cars.length > 0 ? (
            cars.map((row) => (
              <tr key={row.id}>
                {headers.map((header) => (
                  <td className="quick-table__body-cell" key={header.KEY}>{row[header.KEY]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} style={{ textAlign: 'center', padding: '20px' }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default QuickTable;
