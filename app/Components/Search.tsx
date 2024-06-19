"use client";

import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  return (
    <div className="bg-gray-100 p-20 flex justify-center items-center">
      <div className="w-full max-w-3xl">
        <button className="w-full p-4 text-lg font-semibold border-2 rounded-lg focus:outline-none bg-white flex items-center hover:bg-gray-100 cursor-text ">
          <SearchIcon className="mr-2 " />
          Search a Device...
        </button>
      </div>
    </div>
  );
};

export default Search;
