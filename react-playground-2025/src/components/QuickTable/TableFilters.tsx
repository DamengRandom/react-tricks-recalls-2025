import { Header } from "./types";

interface SearchProps {
  column: string;
  value: string
}

interface TableFiltersProps {
  search: SearchProps;
  setSearch: (search: SearchProps) => void;
  headers: Header[];
}

export default function TableFilters({ search, setSearch, headers }: TableFiltersProps) {
  const handleSearch = (value: string) => {
    setSearch({ ...search, value });
  };

  return (
    <div className='quick-table__search-container'>
      <select
        className="quick-table__select"
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
  );
}
