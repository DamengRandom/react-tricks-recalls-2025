import { Car, Header } from "./types";

interface TableBodyProps {
  cars: Car[];
  loading: boolean;
  headers: Header[];
}

export default function TableBody({ cars, loading, headers }: TableBodyProps) {
  return (
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
  );
}
