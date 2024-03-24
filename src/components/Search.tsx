import React from "react";

import { Song } from "../types";

interface Props {
  allSongs: Song[];
  onFilterChange: (filteredSongs: Song[]) => void;
}

const Search: React.FC<Props> = ({ allSongs, onFilterChange }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredSongs = allSongs.filter((song) =>
      song.title.includes(event.target.value)
    );
    onFilterChange(filteredSongs);
  };

  return (
    <input type="text" onChange={handleSearch} placeholder="Search songs..." />
  );
};

export default Search;
