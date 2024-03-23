import "@mantine/core/styles.css";

import { AppShell, MantineProvider } from "@mantine/core";

import AppHeader from "./components/AppHeader";
import AppRoutes from "./components/AppRoutes";
import { theme } from "./theme";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <AppShell header={{ height: 60 }} padding="md">
        <AppHeader />
        <AppShell.Main h="100dvh">
          <AppRoutes />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
