import { Box, Group, Image, Spoiler, Text, Title } from "@mantine/core";

import { ModeType, Song, Voicing } from "../types";

interface Props {
  song: Song;
}

const SongDetails: React.FC<Props> = ({ song }) => {
  const getFriendlyModeType = (mode: ModeType) => {
    if (mode === "Ionian") return "Major";
    if (mode === "Aeolian") return "Minor";
    return mode;
  };

  const voicingsTabs = (voicings: Voicing[]) => {
    return voicings.map((voicing, index) => (
      <Text key={index}>{voicing.toString()}</Text>
    ));
  };

  const spoilerHeight = 250;

  return (
    <>
      <Spoiler hideLabel="Less" showLabel="More" maxHeight={spoilerHeight}>
        <Group align="flex-start" wrap="nowrap">
          <Image h={spoilerHeight} fit="contain" src={song.coverImageUrl} />
          <Box>
            <Title order={2}>{song.title}</Title>
            <Text fw={500}>{song.composer}</Text>
            <Text c="dimmed">{`${song.mode.tonic}  ${getFriendlyModeType(
              song.mode.mode
            )}`}</Text>
            <Text>{song.description}</Text>
          </Box>
        </Group>
      </Spoiler>
      {voicingsTabs(song.voicings)}
    </>
  );
};

export default SongDetails;
