import { useEffect, useState } from "react";

import {
  Anchor,
  AspectRatio,
  Box,
  Card,
  Grid,
  Group,
  Image,
  List,
  Stack,
  Table,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";

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
    <Box pl="md" pr="md" pb="md" mt="md">
      <Title order={2}>{song.title}</Title>
      <Text fw={500}>{song.composer}</Text>
      <Grid gutter="lg">
        <Grid.Col span={{ base: 4, md: 3, xl: 2 }}>
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
              <>
                <Stack gap={0}>
                  <Text>Purchase at:</Text>
                  <List withPadding>
                    {song.purchaseUrls.map((url, index) => (
                      <List.Item key={index}>
                        <Anchor href={url} target="_blank">
                          <Group align="center" gap={3}>
                            {getPurchaseUrlSourceName(url)}
                            <IconExternalLink />
                          </Group>
                        </Anchor>
                      </List.Item>
                    ))}
                  </List>
                </Stack>
              </>
            )}
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 8, md: 9, xl: 10 }}>
          <Text>{song.description}</Text>
          {availableVoicings(song.voicings)}
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default SongDetails;
