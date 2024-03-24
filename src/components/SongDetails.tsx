import {
  Divider,
  Grid,
  Image,
  Spoiler,
  Table,
  Text,
  Title,
} from "@mantine/core";

import { ModeType, Song, Voicing } from "../types";

interface Props {
  song: Song;
}

const SongDetails: React.FC<Props> = ({ song }) => {
  const SPOILER_HEIGHT = 200;

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
      <Text>Available in the following voicings:</Text>
      <ul>
        {voicings.map((voicing, index) => (
          <li key={index}>{voicing.toString()}</li>
        ))}
      </ul>
    </>
  );

  return (
    <>
      <Grid gutter="lg" w="100%">
        <Grid.Col span={2}>
          <Image mah={SPOILER_HEIGHT + 25} w="fit" src={song.coverImageUrl} />
        </Grid.Col>
        <Grid.Col span={7}>
          <Spoiler hideLabel="Less" showLabel="More" maxHeight={SPOILER_HEIGHT}>
            <Title order={2}>{song.title}</Title>
            <Text fw={500}>{song.composer}</Text>
            <Text pt="sm">{song.description}</Text>
          </Spoiler>
        </Grid.Col>
        <Grid.Col span={3}>
          <Table>
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
    </>
  );
};

export default SongDetails;
