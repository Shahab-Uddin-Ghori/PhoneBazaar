import React, { createContext, useEffect, useState } from "react";
export const SearchContextValue = createContext();

function SearchContext({ children }) {
  const [search, setSearch] = useState("");

  return (
    <SearchContextValue.Provider value={[search, setSearch]}>
      {children}
    </SearchContextValue.Provider>
  );
}

export default SearchContext;
