import { useState } from "react";

import { Flex } from "@mantine/core";

import CatalogResults from "../components/CatalogResults";
import Search from "../components/Search";
import { Song } from "../types";

interface Props {
  songs: Song[];
}

const Catalog: React.FC<Props> = ({ songs }) => {
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(songs);

  return (
    <Flex h="100%" direction="column">
      <Search allSongs={songs} onFilterChange={setFilteredSongs} />
      <CatalogResults songs={filteredSongs} />
    </Flex>
  );
};

export default Catalog;
