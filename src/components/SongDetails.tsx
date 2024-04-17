import { useEffect, useState } from "react";

import {
  AspectRatio,
  Box,
  Card,
  Grid,
  Image,
  Spoiler,
  Stack,
  Table,
  Tabs,
  Text,
  Title,
} from "@mantine/core";

import { Song, Voicing } from "../types";
import {
  getFriendlyModeType,
  getFriendlySongDuration,
  getFullDifficultyLevel,
} from "../utils/getFriendlyData";
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
      <Table.Td pr={0} tt="capitalize">
        {value}
      </Table.Td>
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
            <VoicingDetails
              key={index}
              voicing={voicing}
              purchaseUrls={song.purchaseUrls}
            />
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
            <Spoiler maxHeight={105} showLabel="More details" hideLabel="Less">
              <Table withColumnBorders width="100%">
                <Table.Tbody>
                  {tableRow("Accompaniment", song.accompaniment)}
                  {tableRow("Genre", song.genre)}{" "}
                  {tableRow(
                    "Difficulty",
                    song.difficultyLevel
                      ? getFullDifficultyLevel(song.difficultyLevel)
                      : ""
                  )}
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
            </Spoiler>
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
