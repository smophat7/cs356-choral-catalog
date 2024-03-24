import React, { useState } from "react";

import { Box, Flex, NavLink, ScrollArea, Stack } from "@mantine/core";

import { Song } from "../types";
import SongDetails from "./SongDetails";

interface Props {
  songs: Song[];
}

const CatalogResults: React.FC<Props> = ({ songs }) => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(
    songs[0] || null
  );

  const getLabel = (song: Song): string => song.title;
  const getDescription = (song: Song): string => song.composer;

  return (
    <Box flex={1} style={{ overflow: "hidden" }}>
      <Flex h="100%">
        <ScrollArea h="100%" w="25%">
          <Stack gap={0}>
            {songs && songs.length > 0 && (
              <>
                {songs.map((song, index) => (
                  <NavLink
                    key={index}
                    onClick={() => setSelectedSong(song)}
                    active={selectedSong === song}
                    label={getLabel(song)}
                    description={getDescription(song)}
                  />
                ))}
              </>
            )}
          </Stack>
        </ScrollArea>
        <ScrollArea w="100%" pl="md" pt="md">
          {selectedSong && <SongDetails song={selectedSong} />}
        </ScrollArea>
      </Flex>
    </Box>
  );
};

export default CatalogResults;
