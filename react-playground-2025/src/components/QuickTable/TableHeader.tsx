import { headers } from "./mocks";

interface TableHeaderProps {
  setSorting: (sorting: { column: string; order: 'asc' | 'desc' }) => void;
  isDescSorting: (column: string) => boolean;
  isAscSorting: (column: string) => boolean;
}

export default function TableHeader({ setSorting, isDescSorting, isAscSorting }: TableHeaderProps) {
  return (
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
  );
}
