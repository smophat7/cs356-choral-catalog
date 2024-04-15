import React, { useEffect, useRef, useState } from "react";

import {
  Box,
  Divider,
  Flex,
  NavLink,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";

import { Song } from "../types";
import SongDetails from "./SongDetails";

interface Props {
  songs: Song[];
}

const CatalogResults: React.FC<Props> = ({ songs }) => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(
    songs[0] || null
  );
  const songDetailsScrollAreaRef = useRef<HTMLDivElement>(null);

  const getLabel = (song: Song): string => song.title;
  const getDescription = (song: Song): string => song.composer;

  useEffect(() => {
    setSelectedSong(songs[0] || null);
  }, [songs]);

  useEffect(() => {
    if (songDetailsScrollAreaRef.current) {
      songDetailsScrollAreaRef.current.scrollTo({ top: 0 });
    }
  }, [selectedSong, songDetailsScrollAreaRef]);

  return (
    <Box flex={1} style={{ overflow: "hidden" }}>
      <Flex h="100%">
        <ScrollArea h="100%" w="25%">
          <Stack gap={0}>
            {songs && songs.length > 0 && (
              <>
                {songs.map((song, index) => (
                  <div key={index}>
                    <NavLink
                      onClick={() => setSelectedSong(song)}
                      active={selectedSong === song}
                      label={getLabel(song)}
                      description={getDescription(song)}
                    />
                    <Divider />
                  </div>
                ))}
              </>
            )}
          </Stack>
        </ScrollArea>
        <Divider orientation="vertical" />
        <ScrollArea w="100%" pl="md" viewportRef={songDetailsScrollAreaRef}>
          {selectedSong ? (
            <SongDetails song={selectedSong} />
          ) : (
            <Text ta="center" size="xl" mt="md">
              Select a song to view details
            </Text>
          )}
        </ScrollArea>
      </Flex>
    </Box>
  );
};

export default CatalogResults;
