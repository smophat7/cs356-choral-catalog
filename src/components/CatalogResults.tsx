import React, { useState } from "react";

import { Box, Flex, Grid, NavLink, ScrollArea, Stack } from "@mantine/core";

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
      <Grid h="100%">
        <Grid.Col span={{ base: 4, md: 2 }}>
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
        </Grid.Col>
        <Grid.Col span={{ base: 8, md: 10 }}>
          <ScrollArea w="100%" pl="md" pt="md">
            {selectedSong && <SongDetails song={selectedSong} />}
          </ScrollArea>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default CatalogResults;
