import {
  AspectRatio,
  Box,
  Divider,
  Grid,
  Image,
  Table,
  Tabs,
  Text,
  Title,
} from "@mantine/core";

import { ModeType, Song, Voicing } from "../types";
import VoicingDetails from "./VoicingDetails";

interface Props {
  song: Song;
}

const SongDetails: React.FC<Props> = ({ song }) => {
  const getFriendlyModeType = (mode: ModeType) => {
    if (mode === "Ionian") return "Major";
    if (mode === "Aeolian") return "Minor";
    return mode;
  };

  const getFriendlySongDuration = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    } else {
      return `${minutes}:${seconds}`;
    }
  };

  const tableRow = (label: string, value: string) => (
    <Table.Tr>
      <Table.Td>{label}</Table.Td>
      <Table.Td>{value}</Table.Td>
    </Table.Tr>
  );

  const availableVoicings = (voicings: Voicing[]) => (
    <>
      <Text>Available in:</Text>
      <Tabs defaultValue="0">
        <Tabs.List pos="sticky" top={0} bg="white" style={{ zIndex: 1 }}>
          {voicings.map((voicing, index) => (
            <Tabs.Tab key={index} value={index.toString()}>
              {voicing.toString()}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {voicings.map((voicing, index) => (
          <Tabs.Panel key={index} value={index.toString()}>
            <VoicingDetails key={index} voicing={voicing} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </>
  );

  return (
    <Box pl="md" pr="md" pb="md" mt="md">
      <Grid gutter="lg">
        <Grid.Col span={2}>
          <AspectRatio ratio={3 / 4}>
            <Image src={song.coverImageUrl} alt={`${song.title} cover`} />
          </AspectRatio>
        </Grid.Col>
        <Grid.Col span={7}>
          <Title order={2}>{song.title}</Title>
          <Text fw={500}>{song.composer}</Text>
          <Text pt="sm">{song.description}</Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Table withTableBorder width="100%">
            <Table.Tbody>
              {tableRow(
                "Duration",
                getFriendlySongDuration(song.durationSeconds)
              )}
              {tableRow(
                "Key/Mode",
                `${song.mode.tonic}  ${getFriendlyModeType(song.mode.mode)}`
              )}
              {tableRow("Language", song.language)}
              {tableRow("Period", song.musicalPeriod)}
            </Table.Tbody>
          </Table>
        </Grid.Col>
      </Grid>

      <Divider my="md" />
      {availableVoicings(song.voicings)}
    </Box>
  );
};

export default SongDetails;
