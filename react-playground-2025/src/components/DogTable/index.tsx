import { useMemo, useState } from "react";
import { DogProps } from "./types";
import { useDogsFetch } from "./useFetchDogs";
import debounce from "./debounce";

export default function DogTable() {
  const { dogs, isLoading, error } = useDogsFetch();
  const [sortBy, setSortBy] = useState<keyof DogProps>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSetSearch = useMemo(() => debounce((value: string) => {
    setSearchTerm(value);
  }, 500), []);

  const searchFilter = (value: string) => {
    debouncedSetSearch(value);
  };

  const compareValues = (a: unknown, b: unknown) => {
    if (typeof a === "number" && typeof b === "number") return a - b;
    return String(a).localeCompare(String(b));
  };

  const sortFilter = (column: keyof DogProps) => {
    const nextOrder = sortBy === column ? (sortOrder === "asc" ? "desc" : "asc") : "asc";
    setSortBy(column);
    setSortOrder(nextOrder);
  };

  const visibleDogs = useMemo(() => {
    const base = dogs;
    const filtered = searchTerm
      ? base.filter(dog => String(dog[sortBy])?.toLowerCase()?.includes(searchTerm.toLowerCase()))
      : base;
    return [...filtered].sort((a, b) => {
      const result = compareValues(a[sortBy], b[sortBy]);
      return sortOrder === "asc" ? result : -result;
    });
  }, [dogs, searchTerm, sortBy, sortOrder]);

  if (isLoading) return <div>Loading ..</div>;
  if (error) return <div>Error on fetching dogs ..</div>;

  return <div>
    <h3>Welcome to Dogs Table</h3>
    <div>
      {/* Search filter */}
      <label htmlFor="search">Search by: </label>
      <select id="search" value={sortBy} onChange={e => setSortBy(e.target.value as keyof DogProps)}>
        <option value="name">Name</option>
        <option value="breed">Breed</option>
        <option value="age_years">Age (Years)</option>
        <option value="sex">Sex</option>
      </select>
      <input type="text" id="search-input" onChange={e => searchFilter(e.target.value)} />
    </div>
    <table>
      <thead>
        <tr>
          <th onClick={() => sortFilter("id")}>id</th>
          <th onClick={() => sortFilter("name")}>Name</th>
          <th onClick={() => sortFilter("breed")}>Breed</th>
          <th onClick={() => sortFilter("age_years")}>Age (Years)</th>
          <th onClick={() => sortFilter("sex")}>Sex</th>
        </tr>
      </thead>
      <tbody>
        {visibleDogs && visibleDogs.map((dog: DogProps) => (
          <tr key={`${dog.id}-${dog.name}`}>
            <td>{dog.id}</td>
            <td>{dog.name}</td>
            <td>{dog.breed}</td>
            <td>{dog.age_years}</td>
            <td>{dog.sex}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}
