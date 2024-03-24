import React, { useState } from "react";

import { Box, Flex, NavLink, ScrollArea, Stack } from "@mantine/core";

import { Song } from "../types";

interface Props {
  songs: Song[];
}

const CatalogResults: React.FC<Props> = ({ songs }) => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const getLabel = (song: Song): string => song.title;
  const getDescription = (song: Song): string => song.composer;

  return (
    <Box flex={1} style={{ overflow: "hidden" }}>
      <Flex direction="row" h="100%">
        <ScrollArea>
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
        <ScrollArea w="100%" pl="md">
          {selectedSong && (
            <>
              <h4>{selectedSong.title}</h4>
              <p>{selectedSong.composer}</p>
            </>
          )}
        </ScrollArea>
      </Flex>
    </Box>
  );
};

export default CatalogResults;
