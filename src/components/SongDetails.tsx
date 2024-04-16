import { useEffect, useState } from "react";

import {
  AspectRatio,
  Box,
  Button,
  Card,
  Grid,
  Image,
  Menu,
  rem,
  Stack,
  Table,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { IconExternalLink, IconShoppingCart } from "@tabler/icons-react";

import { Song, Voicing } from "../types";
import {
  getFriendlyModeType,
  getFriendlySongDuration,
} from "../utils/getFriendlyData";
import { getPurchaseUrlSourceName } from "../utils/getPurchaseUrlSourceName";
import VoicingDetails from "./VoicingDetails";

interface Props {
  song: Song;
}

const SongDetails: React.FC<Props> = ({ song }) => {
  const [activeVoicingTab, setActiveVoicingTab] = useState<string | null>("0");

  useEffect(() => {
    setActiveVoicingTab("0");
  }, [song]);

  const tableRow = (label: string, value: string) => (
    <Table.Tr>
      <Table.Td pl={0}>{label}</Table.Td>
      <Table.Td pr={0}>{value}</Table.Td>
    </Table.Tr>
  );

  const availableVoicings = (voicings: Voicing[]) => (
    <Card withBorder mt="sm" px="xs" pt={0}>
      <Tabs value={activeVoicingTab} onChange={setActiveVoicingTab}>
        <Tabs.List pos="sticky" top={0} bg="white" style={{ zIndex: 1 }}>
          {voicings.map((voicing, index) => (
            <Tabs.Tab key={index} value={index.toString()}>
              {voicing.toString()}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {voicings.map((voicing, index) => (
          <Tabs.Panel key={index} value={index.toString()} p="md">
            <VoicingDetails key={index} voicing={voicing} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </Card>
  );

  return (
    <Box pl="md" pr="md" pb="md">
      <Title order={2}>{song.title}</Title>
      <Text fw={500}>{song.composer}</Text>
      <Grid gutter="lg">
        <Grid.Col span={{ base: 5, md: 4, lg: 3 }}>
          <Stack>
            <AspectRatio ratio={3 / 4} maw={250}>
              <Image src={song.coverImageUrl} alt={`${song.title} cover`} />
            </AspectRatio>
            <Table withColumnBorders width="100%">
              <Table.Tbody>
                {tableRow("Accompaniment", song.accompaniment)}
                {tableRow("Genre", song.genre)}
                {tableRow(
                  "Duration",
                  getFriendlySongDuration(song.durationSeconds)
                )}

                {tableRow("Language", song.language)}
                {tableRow("Period", song.musicalPeriod)}
                {tableRow(
                  "Key/Mode",
                  `${song.mode.tonic}  ${getFriendlyModeType(song.mode.mode)}`
                )}
              </Table.Tbody>
            </Table>
            {song.purchaseUrls.length > 0 && (
              <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
                <Menu.Target>
                  <Button
                    rightSection={<IconShoppingCart />}
                    color="gray"
                    variant="outline"
                    fullWidth
                    size="compact-md"
                  >
                    Purchase {`(${song.purchaseUrls.length})`}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  {song.purchaseUrls.map((url, index) => (
                    <Menu.Item
                      key={index}
                      leftSection={
                        <IconExternalLink
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                      component="a"
                      href={url}
                      target="_blank"
                      color="blue"
                    >
                      {getPurchaseUrlSourceName(url)}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            )}
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 7, md: 8, lg: 9 }}>
          <Text>{song.description}</Text>
          {availableVoicings(song.voicings)}
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default SongDetails;
