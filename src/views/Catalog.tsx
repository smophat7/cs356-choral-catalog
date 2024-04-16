import { useState } from "react";

import { Center, Container, Title } from "@mantine/core";

import CatalogResults from "../components/CatalogResults";
import Search from "../components/Search";
import { Song } from "../types";

interface Props {
  songs: Song[];
}

const Catalog: React.FC<Props> = ({ songs }) => {
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(songs);

  return (
    <Container
      h="100%"
      size="xl"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Search allSongs={songs} onFilterChange={setFilteredSongs} />
      {filteredSongs.length === 0 ? (
        <Center mt="md">
          <Title order={4}>No songs found</Title>
        </Center>
      ) : (
        <CatalogResults songs={filteredSongs} />
      )}
    </Container>
  );
};

export default Catalog;
