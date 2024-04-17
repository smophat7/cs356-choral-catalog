import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "react-h5-audio-player/lib/styles.css";

import { useEffect, useState } from "react";

import { AppShell, MantineProvider, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import AppHeader from "./components/AppHeader";
import AppRoutes from "./components/AppRoutes";
import Welcome from "./components/Welcome";
import { APP_HEADER_HEIGHT } from "./constants";
import { parseSongData, RawSongData } from "./data/parseSongData";
import songData from "./data/songs.json";
import { theme } from "./theme";
import { Song } from "./types";

export default function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [openedWelcomeModal, { close: closeWelcomeModal }] =
    useDisclosure(true);

  useEffect(() => {
    setSongs(parseSongData(songData as RawSongData[]));
  }, []);

  return (
    <MantineProvider theme={theme}>
      <AppShell header={{ height: APP_HEADER_HEIGHT }}>
        <AppHeader />
        <AppShell.Main h="100dvh">
          <AppRoutes songs={songs} />
          <Modal
            opened={openedWelcomeModal}
            onClose={closeWelcomeModal}
            withCloseButton={false}
            closeOnEscape={false}
            closeOnClickOutside={false}
            centered
            overlayProps={{
              backgroundOpacity: 0.6,
              blur: 2.5,
            }}
          >
            <Welcome close={closeWelcomeModal} />
          </Modal>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
