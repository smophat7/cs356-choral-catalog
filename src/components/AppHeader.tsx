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
    variant: location.pathname === route ? "filled" : "outline",
  });

  return (
    <AppShell.Header>
      <Group h="100%" gap="sm">
        <Title order={1}>Choral Sheet Music</Title>
        <Button {...getButtonProps(RouteEndpoints.Catalog)}>Catalog</Button>
        <Button {...getButtonProps(RouteEndpoints.MyLibrary)}>
          My Library
        </Button>
      </Group>
    </AppShell.Header>
  );
};

export default AppHeader;
