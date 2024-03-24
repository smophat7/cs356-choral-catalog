import React from "react";

import { ScrollArea } from "@mantine/core";

import { Song } from "../types";

interface Props {
  songs: Song[];
}

const CatalogResults: React.FC<Props> = ({ songs }) => {
  return (
    <ScrollArea flex={1}>
      {songs.map((song) => (
        <div key={song.id}>
          <h2>{song.title}</h2>
          <p>{song.composer}</p>
          <p>{song.description}</p>
        </div>
      ))}
    </ScrollArea>
  );
};

export default CatalogResults;
