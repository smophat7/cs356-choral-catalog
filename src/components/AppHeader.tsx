import { AppShell, Box, Container, Group, Text, Title } from "@mantine/core";

const AppHeader: React.FC = () => {
  return (
    <AppShell.Header>
      <Container h="100%" size="xl">
        <Group h="100%" gap="sm" justify="space-between">
          <Box>
            <Title order={2}>Choral Catalog</Title>
            <Text c="dimmed" size="xs">
              Find the perfect songs for your choir
            </Text>
          </Box>
        </Group>
      </Container>
    </AppShell.Header>
  );
};

export default AppHeader;
