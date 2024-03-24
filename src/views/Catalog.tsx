import { useState } from "react";

import { Box, Stack } from "@mantine/core";

import CatalogResults from "../components/CatalogResults";
import Search from "../components/Search";
import { Song } from "../types";

interface Props {
  songs: Song[];
}

const Catalog: React.FC<Props> = ({ songs }) => {
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(songs);

  return (
    <Box h="100%">
      <Stack h="100%">
        <Search allSongs={songs} onFilterChange={setFilteredSongs} />
        <CatalogResults songs={filteredSongs} />
      </Stack>
    </Box>
  );
};

export default Catalog;
