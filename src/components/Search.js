import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <div className="flex">
      <input
        className="border p-2"
        type="text"
        placeholder="Filter by Table Name"
      />
      <span className="bg-blue-400 p-2">
        <FaSearch size={24} color="white" />
      </span>
    </div>
  );
};

export default Search;
