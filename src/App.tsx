import "@mantine/core/styles.css";

import { useEffect, useState } from "react";

import { AppShell, MantineProvider } from "@mantine/core";

import AppHeader from "./components/AppHeader";
import AppRoutes from "./components/AppRoutes";
import { APP_HEADER_HEIGHT } from "./constants";
import { parseSongData, RawSongData } from "./data/parseSongData";
import songData from "./data/songs.json";
import { theme } from "./theme";
import { Song } from "./types";

export default function App() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    setSongs(parseSongData(songData as RawSongData[]));
  }, []);

  return (
    <MantineProvider theme={theme}>
      <AppShell header={{ height: APP_HEADER_HEIGHT }} padding="md">
        <AppHeader />
        <AppShell.Main h="100dvh">
          <AppRoutes songs={songs} />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
