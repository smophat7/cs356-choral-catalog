import AudioPlayer from "react-h5-audio-player";

import { Carousel } from "@mantine/carousel";
import {
  AspectRatio,
  Button,
  Grid,
  Image,
  Menu,
  Modal,
  rem,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconExternalLink,
  IconNotes,
  IconShoppingCart,
} from "@tabler/icons-react";

import { SheetMusicPreview, VocalRange, Voicing } from "../types";
import { getPurchaseUrlSourceName } from "../utils/getPurchaseUrlSourceName";
import classes from "./VoicingDetails.module.css";

interface Props {
  voicing: Voicing;
  purchaseUrls: string[];
}

const VoicingDetails: React.FC<Props> = ({ voicing, purchaseUrls }) => {
  const [
    isSheetMusicModalOpen,
    { open: openSheetMusicModal, close: closeSheetMusicModal },
  ] = useDisclosure(false);
  const MODAL_HEADER_HEIGHT = 60;
  const AUDIO_PLAYER_HEIGHT = 80;

  const range = (vocalRange: VocalRange) => (
    <>
      {vocalRange.low.note}
      {vocalRange.low.octave} - {vocalRange.high.note}
      {vocalRange.high.octave}
    </>
  );

  const sheetMusic = (sheetMusicPreview: SheetMusicPreview) => (
    <>
      <Carousel
        slideSize="60%"
        slideGap="xs"
        controlSize={70}
        height={`calc(100vh - ${MODAL_HEADER_HEIGHT}px - ${AUDIO_PLAYER_HEIGHT}px)`}
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
              h={`calc(100vh - ${MODAL_HEADER_HEIGHT}px - ${AUDIO_PLAYER_HEIGHT}px)`}
              fit="contain"
            />
          </Carousel.Slide>
        ))}
      </Carousel>
      <AudioPlayer
        src={voicing.audioUrl}
        autoPlay
        volume={0.5}
        showFilledVolume
        style={{ height: `${AUDIO_PLAYER_HEIGHT}px` }}
      />
    </>
  );

  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack gap="xs">
            <Grid>
              <Grid.Col span={{ base: 12, md: 6, lg: 12 }}>
                <Button
                  variant="outline"
                  leftSection={<IconNotes />}
                  onClick={openSheetMusicModal}
                  fullWidth
                >
                  Preview Score
                </Button>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 12 }}>
                {purchaseUrls.length > 0 && (
                  <Menu
                    trigger="click-hover"
                    openDelay={100}
                    closeDelay={400}
                    withArrow
                    offset={0}
                    shadow="md"
                  >
                    <Menu.Target>
                      <Button
                        leftSection={<IconShoppingCart />}
                        color="gray"
                        variant="outline"
                        fullWidth
                      >
                        Purchase {`(${purchaseUrls.length})`}
                      </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                      {purchaseUrls.map((url, index) => (
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
              </Grid.Col>
            </Grid>
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
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 8 }}>
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
