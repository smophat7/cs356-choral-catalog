import { useLocation, useNavigate } from "react-router-dom";

import { AppShell, Button, Group, Title } from "@mantine/core";

import { RouteEndpoints } from "../types";

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getButtonProps = (route: RouteEndpoints) => ({
    onClick: () => {
      navigate(route);
    },
    variant: location.pathname === route ? "outline" : "subtle",
  });

  return (
    <AppShell.Header>
      <Group h="100%" gap="sm" px="sm" justify="space-between">
        <Title order={2}>Choral Sheet Music</Title>
        <Group gap="sm">
          <Button {...getButtonProps(RouteEndpoints.Catalog)}>Catalog</Button>
          <Button {...getButtonProps(RouteEndpoints.MyLibrary)}>
            My Library
          </Button>
        </Group>
      </Group>
    </AppShell.Header>
  );
};

export default AppHeader;
