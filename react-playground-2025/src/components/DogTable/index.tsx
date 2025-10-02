import { useEffect, useMemo, useState } from "react";
import { DogProps } from "./types";
import { useDogsFetch } from "./useFetchDogs";
import debounce from "./debounce";

export default function DogTable() {
  const { dogs, isLoading, error } = useDogsFetch();
  const [currentDogs, setCurentDogs] = useState<DogProps[]>([]);
  const [sortBy, setSortBy] = useState<keyof DogProps>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setCurentDogs(dogs);
  }, [dogs]);

  const handleSelect = (value: keyof DogProps) => {
    setSortBy(value);
    setCurentDogs(dogs);
  };

  const debounceSearch = useMemo(() => debounce((value: string) => {
    if (!value) return setCurentDogs(dogs);
    const filterd = dogs.filter(dog => String(dog[sortBy])?.toLowerCase()?.includes(value.toLowerCase()));

    setCurentDogs(filterd);
  }, 500), [dogs, sortBy]);

  const searchFilter = (value: string) => {
    debounceSearch(value);
  };

  const compareValues = (a: unknown, b: unknown) => {
    if (typeof a === "number" && typeof b === "number") return a - b;
    return String(a).localeCompare(String(b));
  };

  const sortFilter = (column: keyof DogProps) => {
    const nextOrder = sortBy === column ? (sortOrder === "asc" ? "desc" : "asc") : "asc";
    const sorted = dogs.sort((a, b) => {
      const result = compareValues(a[column], b[column]);
      return nextOrder === "asc" ? result : -result;
    });
    setSortBy(column);
    setSortOrder(nextOrder);
    setCurentDogs(sorted);
  };

  if (isLoading) return <div>Loading ..</div>;
  
  if (error) return <div>Error on fetching dogs ..</div>;

  return <div>
    <h3>Welcome to Dogs Table</h3>
    <div>
      {/* Search filter */}
      <label htmlFor="search">Search by: </label>
      <select id="search" value={sortBy} onChange={e => handleSelect(e.target.value as keyof DogProps)}>
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
        {currentDogs && currentDogs.map((dog: DogProps) => (
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
