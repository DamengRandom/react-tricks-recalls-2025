import { FC, useState } from "react";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";

interface ComponentProps {
  name?: string
}

// (1). define function component types properly
const GoodConsistentComponentDesign: FC<ComponentProps> = ({ name = 'Default Name' }) => {
  // Goal: we need all component to have same component design / pattern -> like (1), (2), (3), (4) and etc
  // - Keep consistency for later on maintainence purpose
  // - Make it more readable since they are following same pattern
  
  // (2). define hooks
  const [searchValue, setSearchValue] = useState("");
  const debounced = useDebouncedValue(searchValue, 1000);

  // (3). use component functions
  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  // (4). write JSX
  return (
    <div>
      <label>Search for value with delay effect: </label>
      <input onChange={(e) => handleSearch(e.target.value)} value={searchValue} />
      <p>Debounced Input value: {debounced}</p>
      <p>Prop name: { name }</p>
    </div>
  )
}

export default GoodConsistentComponentDesign;
