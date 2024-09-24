import React, { createContext, useState } from "react"; // Importing necessary hooks from React
export const SearchContextValue = createContext(); // Creating a context for search values

function SearchContext({ children }) {
  const [search, setSearch] = useState(""); // Initializing search state with an empty string

  return (
    <SearchContextValue.Provider value={[search, setSearch]}>
      {" "}
      {/* Providing search state and updater function to the context */}
      {children} {/* Rendering child components within the provider */}
    </SearchContextValue.Provider>
  );
}

export default SearchContext; // Exporting the SearchContext component
