import { Carousel } from "@mantine/carousel";
import {
  AspectRatio,
  Button,
  Grid,
  Image,
  Modal,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconNotes } from "@tabler/icons-react";

import { SheetMusicPreview, VocalRange, Voicing } from "../types";
import classes from "./VoicingDetails.module.css";

interface Props {
  voicing: Voicing;
}

const VoicingDetails: React.FC<Props> = ({ voicing }) => {
  const [
    isSheetMusicModalOpen,
    { open: openSheetMusicModal, close: closeSheetMusicModal },
  ] = useDisclosure(false);
  const MODAL_HEADER_HEIGHT = 60;

  const range = (vocalRange: VocalRange) => (
    <>
      {vocalRange.low.note}
      {vocalRange.low.octave} - {vocalRange.high.note}
      {vocalRange.high.octave}
    </>
  );

  const sheetMusic = (sheetMusicPreview: SheetMusicPreview) => (
    <Carousel
      slideSize="60%"
      slideGap="xs"
      controlSize={40}
      height={`calc(100vh - ${MODAL_HEADER_HEIGHT}px)`}
      speed={20}
      classNames={classes}
      withIndicators
    >
      {sheetMusicPreview.pageUrls.map((url, index) => (
        <Carousel.Slide key={index}>
          <Image
            src={url}
            alt={`Sheet music page ${index + 1}`}
            radius="md"
            h={`calc(100vh - ${MODAL_HEADER_HEIGHT}px)`}
            fit="contain"
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );

  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Button
            variant="outline"
            leftSection={<IconNotes />}
            onClick={openSheetMusicModal}
          >
            Preview Score
          </Button>
          <Table>
            <Table.Tbody>
              <Table.Tr>
                <Table.Th>Part</Table.Th>
                <Table.Th>Range</Table.Th>
              </Table.Tr>
              {voicing.voices.map((voice, index) => {
                return voice.type === "StandardVoice" ? (
                  <Table.Tr key={index}>
                    <Table.Td tt="capitalize">{voice.part}</Table.Td>
                    <Table.Td>
                      <Text>{range(voice.range)}</Text>
                    </Table.Td>
                  </Table.Tr>
                ) : (
                  <Table.Tr key={index}>
                    <Table.Td>{voice.part.toString()}</Table.Td>
                    <Table.Td>{range(voice.range)}</Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <AspectRatio ratio={16 / 9} maw={800}>
            <iframe
              src={voicing.videoUrl}
              title="YouTube video player"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </AspectRatio>
        </Grid.Col>
      </Grid>
      <Modal
        opened={isSheetMusicModalOpen}
        onClose={closeSheetMusicModal}
        fullScreen
        radius={0}
        transitionProps={{ transition: "slide-up", duration: 400 }}
        withCloseButton={false}
        padding={0}
      >
        <Modal.Header p="md" h={`${MODAL_HEADER_HEIGHT}px`}>
          <Modal.Title>
            <Title order={3}>{voicing.toString()}</Title>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>{sheetMusic(voicing.sheetMusicPreview)}</Modal.Body>
      </Modal>
    </>
  );
};

export default VoicingDetails;
