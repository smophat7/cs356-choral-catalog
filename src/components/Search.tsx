import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  Card,
  CloseButton,
  ComboboxItem,
  Grid,
  Group,
  Kbd,
  Modal,
  Pill,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import { IconFilter, IconSearch, IconX } from "@tabler/icons-react";

import { MusicalPeriod, Note, Song, VocalRangeFilter } from "../types";
import { isInVoicingCategory, VoicingCategory } from "../types/VoicingFilter";
import Filter from "./Filter";
import RangeFilter from "./RangeFilter";

interface Props {
  allSongs: Song[];
  onFilterChange: (filteredSongs: Song[]) => void;
}

const Search: React.FC<Props> = ({ allSongs, onFilterChange }) => {
  const [searchTextFilteredSongs, setSearchTextFilteredSongs] = useState<
    Song[] | null
  >(null);
  const [voicingCategoryFilter, setVoicingCategoryFilter] =
    useState<VoicingCategory | null>(null);
  const [searchTextFilter, setSearchTextFilter] = useState<string>("");
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);
  const [musicalPeriodFilter, setMusicalPeriodFilter] =
    useState<MusicalPeriod | null>(null);
  const [composerFilter, setComposerFilter] = useState<string | null>(null);
  const [accompanimentFilter, setAccompanimentFilter] = useState<string | null>(
    null
  );
  const [genreFilter, setGenreFilter] = useState<string | null>(null);
  const [rangeFilter, setRangeFilter] = useState<VocalRangeFilter>({
    soprano: {
      enabled: false,
      low: { note: Note.C, octave: 4 },
      high: { note: Note.A, octave: 5 },
    },
    alto: {
      enabled: false,
      low: { note: Note.G, octave: 3 },
      high: { note: Note.D, octave: 5 },
    },
    tenor: {
      enabled: false,
      low: { note: Note.C, octave: 3 },
      high: { note: Note.G, octave: 4 },
    },
    bass: {
      enabled: false,
      low: { note: Note.E, octave: 2 },
      high: { note: Note.C, octave: 4 },
    },
  });

  // Hotkey for search text input focus
  const searchTextInputRef = useRef<HTMLInputElement>(null);
  useHotkeys([
    [
      "ctrl+K",
      () => {
        if (searchTextInputRef.current) {
          searchTextInputRef.current.focus();
        }
      },
    ],
  ]);

  // Modal state
  const [opened, { open, close }] = useDisclosure(false);

  // Apply filters (except search text)
  useEffect(() => {
    const songsToFilterFrom = searchTextFilteredSongs || allSongs;
    const filteredSongs = songsToFilterFrom.filter(
      (song) =>
        (voicingCategoryFilter === null ||
          song.voicings.some((voicing) =>
            isInVoicingCategory(voicing, voicingCategoryFilter)
          )) &&
        (languageFilter === null || song.language === languageFilter) &&
        (musicalPeriodFilter === null ||
          song.musicalPeriod === musicalPeriodFilter) &&
        (composerFilter === null || song.composer === composerFilter) &&
        (accompanimentFilter === null ||
          song.accompaniment === accompanimentFilter) &&
        (genreFilter === null || song.genre === genreFilter)
    );
    onFilterChange(filteredSongs);
  }, [
    allSongs,
    onFilterChange,
    searchTextFilteredSongs,
    voicingCategoryFilter,
    languageFilter,
    musicalPeriodFilter,
    composerFilter,
    accompanimentFilter,
    genreFilter,
  ]);

  // Apply search text filter
  useEffect(() => {
    const filteredSongs = allSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(searchTextFilter.toLowerCase()) ||
        song.composer.toLowerCase().includes(searchTextFilter.toLowerCase()) ||
        song.description
          .toLowerCase()
          .includes(searchTextFilter.toLowerCase()) ||
        song.language.toLowerCase().includes(searchTextFilter.toLowerCase()) ||
        song.musicalPeriod
          .toLowerCase()
          .includes(searchTextFilter.toLowerCase())
    );
    setSearchTextFilteredSongs(filteredSongs);
  }, [allSongs, searchTextFilter]);

  const voicingData: ComboboxItem[] = Object.values(VoicingCategory).map(
    (voicingCategory) => ({
      value: voicingCategory,
      label: voicingCategory,
    })
  );

  const musicalPeriodData: ComboboxItem[] = Object.values(MusicalPeriod).map(
    (musicalPeriod) => ({
      value: musicalPeriod,
      label: musicalPeriod,
    })
  );

  const languageData: ComboboxItem[] = allSongs
    .map((song) => song.language)
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((language) => ({
      value: language,
      label: language,
    }));

  const composerData: ComboboxItem[] = allSongs
    .map((song) => song.composer)
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((composer) => ({
      value: composer,
      label: composer,
    }));

  const accompanimentData: ComboboxItem[] = allSongs
    .map((song) => song.accompaniment)
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((accompaniment) => ({
      value: accompaniment,
      label: accompaniment,
    }));

  const genreData: ComboboxItem[] = allSongs
    .map((song) => song.genre)
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((genre) => ({
      value: genre,
      label: genre,
    }));

  const filterPill = (value: string | string[], onRemove: () => void) => (
    <Pill onRemove={onRemove} withRemoveButton size="lg">
      {value}
    </Pill>
  );

  const numFiltersApplied =
    (languageFilter ? 1 : 0) +
    (musicalPeriodFilter ? 1 : 0) +
    (composerFilter ? 1 : 0) +
    (accompanimentFilter ? 1 : 0) +
    (genreFilter ? 1 : 0);

  return (
    <Card shadow="md" p="sm" my="md" withBorder>
      <Stack>
        <Grid align="center">
          <Grid.Col span={8}>
            <Filter>
              <TextInput
                leftSection={<IconSearch />}
                rightSectionWidth={125}
                rightSection={
                  <Group wrap="nowrap">
                    <CloseButton
                      onClick={() => {
                        setSearchTextFilter("");
                      }}
                    />
                    <Kbd>Ctrl + K</Kbd>
                  </Group>
                }
                placeholder="Search anything"
                value={searchTextFilter}
                onChange={(event) =>
                  setSearchTextFilter(event.currentTarget.value)
                }
                ref={searchTextInputRef}
              />
            </Filter>
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              placeholder="Select voicing..."
              data={voicingData}
              value={voicingCategoryFilter}
              onChange={(value) =>
                setVoicingCategoryFilter(value as VoicingCategory)
              }
              clearable
              searchable
            />
          </Grid.Col>
        </Grid>

        <Group>
          <Button.Group>
            <Button
              onClick={open}
              leftSection={<IconFilter />}
              title="More Filters"
              aria-label="More Filters"
              pl="sm"
              pr={numFiltersApplied > 0 ? 0 : "sm"}
            >
              More Filters
              {numFiltersApplied > 0 && ` (${numFiltersApplied})`}
            </Button>
            {numFiltersApplied > 0 && (
              <Button
                onClick={() => {
                  setLanguageFilter(null);
                  setMusicalPeriodFilter(null);
                  setComposerFilter(null);
                  setAccompanimentFilter(null);
                  setGenreFilter(null);
                }}
                title="Clear"
                aria-label="Clear"
                pr="sm"
                pl="xs"
              >
                <IconX />
              </Button>
            )}
          </Button.Group>
          {numFiltersApplied > 0 && (
            <>
              {languageFilter &&
                filterPill(languageFilter, () => setLanguageFilter(null))}
              {musicalPeriodFilter &&
                filterPill(musicalPeriodFilter, () =>
                  setMusicalPeriodFilter(null)
                )}
              {composerFilter &&
                filterPill(composerFilter, () => setComposerFilter(null))}
              {accompanimentFilter &&
                filterPill(accompanimentFilter, () =>
                  setAccompanimentFilter(null)
                )}
              {genreFilter &&
                filterPill(genreFilter, () => setGenreFilter(null))}
            </>
          )}
        </Group>
      </Stack>
      <Modal title="More Filters" opened={opened} onClose={close} centered>
        <Stack>
          <Filter title="Musical Period">
            <Select
              placeholder="Select period..."
              data={musicalPeriodData}
              value={musicalPeriodFilter}
              onChange={(value) =>
                setMusicalPeriodFilter(value as MusicalPeriod)
              }
              clearable
              searchable
            />
          </Filter>
          <Filter title="Language">
            <Select
              placeholder="Select language..."
              data={languageData}
              value={languageFilter}
              onChange={(value) => setLanguageFilter(value)}
              clearable
              searchable
            />
          </Filter>
          <Filter title="Composer">
            <Select
              placeholder="Select composer..."
              data={composerData}
              value={composerFilter}
              onChange={(value) => setComposerFilter(value)}
              clearable
              searchable
            />
          </Filter>
          <Filter title="Accompaniment">
            <Select
              placeholder="Select accompaniment..."
              data={accompanimentData}
              value={accompanimentFilter}
              onChange={(value) => setAccompanimentFilter(value)}
              clearable
              searchable
            />
          </Filter>
          <Filter title="Genre">
            <Select
              placeholder="Select genre..."
              data={genreData}
              value={genreFilter}
              onChange={(value) => setGenreFilter(value)}
              clearable
              searchable
            />
          </Filter>
          <Filter title="Voicing and Range">
            <RangeFilter
              voicingFilter={rangeFilter}
              setVoicingFilter={setRangeFilter}
            />
          </Filter>
        </Stack>
      </Modal>
    </Card>
  );
};

export default Search;
