import React from "react";

import { Box, Button, Center, List, Stack, Text, Title } from "@mantine/core";

interface Props {
  close: () => void;
}

const Welcome: React.FC<Props> = ({ close }) => {
  return (
    <Stack>
      <Title order={3}>Welcome to the Choral Catalog!</Title>
      <Text>
        Find the perfect piece for your choir with our extensive collection of
        choral sheet music.
      </Text>
      <Box>
        <Text>To enhance your browsing experience, we offer:</Text>

        <List withPadding>
          <List.Item>Saved search filters</List.Item>
          <List.Item>Vocal ranges per voice part</List.Item>
          <List.Item>Links to purchase at all available sellers</List.Item>
          <List.Item>Sheet music previews</List.Item>
          <List.Item>Audio and video recordings</List.Item>
        </List>
      </Box>
      <Center>
        <Button onClick={close} size="lg">
          Let's Go!
        </Button>
      </Center>
    </Stack>
  );
};

export default Welcome;
