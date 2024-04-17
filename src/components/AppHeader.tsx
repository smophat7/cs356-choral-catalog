import { AppShell, Box, Container, Group, Text, Title } from "@mantine/core";
import { IconMusic } from "@tabler/icons-react";

const AppHeader: React.FC = () => {
  return (
    <AppShell.Header>
      <Container h="100%" size="xl">
        <Group h="100%" gap="sm" justify="flex-start">
          <Box>
            <Group justify="space-between" gap={0}>
              <IconMusic />
              <Title order={2}>Choral Catalog</Title>
            </Group>
            <Text c="dimmed" size="xs">
              Find the perfect songs for your choirs
            </Text>
          </Box>
        </Group>
      </Container>
    </AppShell.Header>
  );
};

export default AppHeader;
