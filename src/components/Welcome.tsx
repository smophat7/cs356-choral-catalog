import React from "react";

import { Button, Center, List, Stack, Text, Title } from "@mantine/core";

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
      <>To enhance your browsing experience, we offer:</>
      <List withPadding>
        <List.Item>Saved search filters</List.Item>
        <List.Item>Voicing details and vocal ranges</List.Item>
        <List.Item>Sheet music previews</List.Item>
        <List.Item>Audio and video recordings</List.Item>
        <List.Item>Direct links to purchase</List.Item>
      </List>
      <Center>
        <Button onClick={close} size="lg">
          Let's Go!
        </Button>
      </Center>
    </Stack>
  );
};

export default Welcome;
