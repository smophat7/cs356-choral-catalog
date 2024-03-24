import React from "react";

import { Song } from "../types";

interface Props {
  songs: Song[];
}

const CatalogResults: React.FC<Props> = ({ songs }) => {
  return (
    <div>
      {songs.map((song) => (
        <div key={song.id}>
          <h2>{song.title}</h2>
          <p>{song.composer}</p>
          <p>{song.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CatalogResults;
