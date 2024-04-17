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
  rem,
  Select,
  Stack,
  Tabs,
  TextInput,
} from "@mantine/core";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import { IconFilter, IconPlus, IconSearch, IconX } from "@tabler/icons-react";

import { DifficultyLevel, MusicalPeriod, Song } from "../types";
import { isInVoicingCategory, VoicingCategory } from "../types/VoicingFilter";
import { getFullDifficultyLevel } from "../utils/getFriendlyData";
import Filter from "./Filter";
import SearchTab from "./SearchTab";

function generateComboboxData(
  items: string[],
  label?: (item: string) => string
): ComboboxItem[] {
  return items
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((item) => ({
      value: item,
      label: label ? label(item) : item,
    }));
}

interface FilterSet {
  name: string;
  searchTextFilter: string;
  voicingCategoryFilter: VoicingCategory | null;
  languageFilter: string | null;
  musicalPeriodFilter: MusicalPeriod | null;
  composerFilter: string | null;
  accompanimentFilter: string | null;
  genreFilter: string | null;
  difficultyLevelFilter: DifficultyLevel | null;
}

const initialFilterSet: FilterSet = {
  name: "Search 1",
  searchTextFilter: "",
  voicingCategoryFilter: null,
  languageFilter: null,
  musicalPeriodFilter: null,
  composerFilter: null,
  accompanimentFilter: null,
  genreFilter: null,
  difficultyLevelFilter: null,
};

interface Props {
  allSongs: Song[];
  onFilterChange: (filteredSongs: Song[]) => void;
}

const Search: React.FC<Props> = ({ allSongs, onFilterChange }) => {
  const [filterSets, setFilterSets] = useState<FilterSet[]>([initialFilterSet]);
  const [activeFilterSetIndex, setActiveFilterSetIndex] = useState(0);
  const activeFilterSet = filterSets[activeFilterSetIndex];
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [clearFilters, setClearFilters] = useState<boolean>(false);
  const [searchTextFilteredSongs, setSearchTextFilteredSongs] = useState<
    Song[] | null
  >(null);
  const updateActiveFilterSet = (newFilterSet: FilterSet) => {
    const newFilterSets = [...filterSets];
    newFilterSets[activeFilterSetIndex] = newFilterSet;
    setFilterSets(newFilterSets);
  };
  const setSearchTextFilter = (searchTextFilter: string) => {
    updateActiveFilterSet({ ...activeFilterSet, searchTextFilter });
  };
  const setVoicingCategoryFilter = (
    voicingCategoryFilter: VoicingCategory | null
  ) => {
    updateActiveFilterSet({ ...activeFilterSet, voicingCategoryFilter });
  };
  const setLanguageFilter = (languageFilter: string | null) => {
    updateActiveFilterSet({ ...activeFilterSet, languageFilter });
  };
  const setMusicalPeriodFilter = (
    musicalPeriodFilter: MusicalPeriod | null
  ) => {
    updateActiveFilterSet({ ...activeFilterSet, musicalPeriodFilter });
  };
  const setComposerFilter = (composerFilter: string | null) => {
    updateActiveFilterSet({ ...activeFilterSet, composerFilter });
  };
  const setAccompanimentFilter = (accompanimentFilter: string | null) => {
    updateActiveFilterSet({ ...activeFilterSet, accompanimentFilter });
  };
  const setGenreFilter = (genreFilter: string | null) => {
    updateActiveFilterSet({ ...activeFilterSet, genreFilter });
  };
  const setDifficultyLevelFilter = (difficultyLevelFilter: number | null) => {
    updateActiveFilterSet({ ...activeFilterSet, difficultyLevelFilter });
  };

  const setActiveFilterTab = (tab: string | null) => {
    if (!tab) {
      setActiveFilterSetIndex(0);
    } else if (tab === "new") {
      addFilterSet();
    } else {
      const index = parseInt(tab);
      setActiveFilterSetIndex(index);
    }
  };

  const addFilterSet = () => {
    const length = filterSets.length;
    const newFilterSetName = `Search ${length + 1}`;
    const newFilterSet = {
      name: newFilterSetName,
      searchTextFilter: "",
      voicingCategoryFilter: null,
      languageFilter: null,
      musicalPeriodFilter: null,
      composerFilter: null,
      accompanimentFilter: null,
      genreFilter: null,
      difficultyLevelFilter: null,
    };
    setFilterSets([...filterSets, newFilterSet]);
    setActiveFilterSetIndex(length);
  };

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

  const updateFilterSetName = (index: number, name: string) => {
    const newFilterSets = [...filterSets];
    newFilterSets[index].name = name;
    setFilterSets(newFilterSets);
  };

  const deleteFilterSet = (index: number) => {
    if (filterSets.length === 1) {
      return;
    }
    setDeleteIndex(index); // Set deleteIndex to trigger deletion on next render
  };

  // Modal state
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (deleteIndex !== null) {
      setFilterSets((prevFilterSets) => {
        const newFilterSets = [...prevFilterSets];
        newFilterSets.splice(deleteIndex, 1);
        return newFilterSets;
      });

      if (deleteIndex <= activeFilterSetIndex) {
        const newActiveIndex =
          activeFilterSetIndex > 0 ? activeFilterSetIndex - 1 : 0;
        setActiveFilterSetIndex(newActiveIndex);
      }

      setDeleteIndex(null); // Reset deleteIndex
    }
  }, [deleteIndex, activeFilterSetIndex]);

  useEffect(() => {
    if (clearFilters) {
      const clearedFilterSet: FilterSet = {
        name: activeFilterSet.name,
        searchTextFilter: activeFilterSet.searchTextFilter,
        voicingCategoryFilter: null,
        languageFilter: null,
        musicalPeriodFilter: null,
        composerFilter: null,
        accompanimentFilter: null,
        genreFilter: null,
        difficultyLevelFilter: null,
      };
      updateActiveFilterSet(clearedFilterSet);
      setClearFilters(false);
    }
  }, [
    activeFilterSet.name,
    activeFilterSet.searchTextFilter,
    clearFilters,
    updateActiveFilterSet,
  ]);

  // Apply filters (except search text)
  useEffect(() => {
    const songsToFilterFrom = searchTextFilteredSongs || allSongs;
    const voicingCategoryFilter = activeFilterSet.voicingCategoryFilter;
    const languageFilter = activeFilterSet.languageFilter;
    const musicalPeriodFilter = activeFilterSet.musicalPeriodFilter;
    const composerFilter = activeFilterSet.composerFilter;
    const accompanimentFilter = activeFilterSet.accompanimentFilter;
    const genreFilter = activeFilterSet.genreFilter;
    const difficultyLevelFilter = activeFilterSet.difficultyLevelFilter;

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
        (genreFilter === null || song.genre === genreFilter) &&
        (difficultyLevelFilter === null ||
          song.difficultyLevel === difficultyLevelFilter)
    );
    onFilterChange(filteredSongs);
  }, [
    allSongs,
    onFilterChange,
    searchTextFilteredSongs,
    activeFilterSet.voicingCategoryFilter,
    activeFilterSet.languageFilter,
    activeFilterSet.musicalPeriodFilter,
    activeFilterSet.composerFilter,
    activeFilterSet.accompanimentFilter,
    activeFilterSet.genreFilter,
    activeFilterSet.difficultyLevelFilter,
  ]);

  // Apply search text filter
  useEffect(() => {
    const searchText = activeFilterSet.searchTextFilter.toLowerCase();
    const filteredSongs = allSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(searchText) ||
        song.composer.toLowerCase().includes(searchText) ||
        song.description.toLowerCase().includes(searchText) ||
        song.language.toLowerCase().includes(searchText) ||
        song.musicalPeriod.toLowerCase().includes(searchText) ||
        song.accompaniment.toLowerCase().includes(searchText) ||
        song.genre.toLowerCase().includes(searchText)
    );
    setSearchTextFilteredSongs(filteredSongs);
  }, [allSongs, activeFilterSet.searchTextFilter]);

  const voicingData: ComboboxItem[] = generateComboboxData(
    Object.values(VoicingCategory)
  );
  const musicalPeriodData: ComboboxItem[] = generateComboboxData(
    Object.values(MusicalPeriod)
  );
  const languageData: ComboboxItem[] = generateComboboxData(
    allSongs.map((song) => song.language)
  );
  const composerData: ComboboxItem[] = generateComboboxData(
    allSongs.map((song) => song.composer)
  );
  const accompanimentData: ComboboxItem[] = generateComboboxData(
    allSongs.map((song) => song.accompaniment)
  );
  const genreData: ComboboxItem[] = generateComboboxData(
    allSongs.map((song) => song.genre)
  );
  const difficultyLevelData: ComboboxItem[] = generateComboboxData(
    allSongs.map((song) => song.difficultyLevel.toString()).sort(),
    (item: string) => getFullDifficultyLevel(parseInt(item) as DifficultyLevel)
  );

  const filterPill = (value: string | string[], onRemove: () => void) => (
    <Pill onRemove={onRemove} withRemoveButton size="lg">
      {value}
    </Pill>
  );

  const numFiltersApplied =
    (activeFilterSet.languageFilter ? 1 : 0) +
    (activeFilterSet.musicalPeriodFilter ? 1 : 0) +
    (activeFilterSet.composerFilter ? 1 : 0) +
    (activeFilterSet.accompanimentFilter ? 1 : 0) +
    (activeFilterSet.genreFilter ? 1 : 0) +
    (activeFilterSet.difficultyLevelFilter ? 1 : 0);

  const tabsList = () => {
    return (
      <>
        {filterSets.map((filterSet, index) => (
          <SearchTab
            key={index}
            filterSet={filterSet}
            updateName={(name) => updateFilterSetName(index, name)}
            deleteFilterSet={(index) => deleteFilterSet(index)}
            index={index}
            active={index === activeFilterSetIndex}
            numFilterTabs={filterSets.length}
          />
        ))}
        <Tabs.Tab value="new" title="New search">
          <IconPlus style={{ width: rem(15), height: rem(15) }} />
        </Tabs.Tab>
      </>
    );
  };

  return (
    <Tabs
      value={
        activeFilterSetIndex < filterSets.length
          ? activeFilterSetIndex.toString()
          : (filterSets.length - 1).toString()
      }
      onChange={setActiveFilterTab}
      variant="outline"
      p={0}
      my="md"
    >
      <Tabs.List>{tabsList()}</Tabs.List>
      <Card shadow="md" withBorder style={{ borderTop: "none" }} radius={0}>
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
                  value={activeFilterSet.searchTextFilter}
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
                value={activeFilterSet.voicingCategoryFilter}
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
                    setClearFilters(true);
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
                {activeFilterSet.languageFilter &&
                  filterPill(activeFilterSet.languageFilter, () =>
                    setLanguageFilter(null)
                  )}
                {activeFilterSet.musicalPeriodFilter &&
                  filterPill(activeFilterSet.musicalPeriodFilter, () =>
                    setMusicalPeriodFilter(null)
                  )}
                {activeFilterSet.composerFilter &&
                  filterPill(activeFilterSet.composerFilter, () =>
                    setComposerFilter(null)
                  )}
                {activeFilterSet.accompanimentFilter &&
                  filterPill(activeFilterSet.accompanimentFilter, () =>
                    setAccompanimentFilter(null)
                  )}
                {activeFilterSet.genreFilter &&
                  filterPill(activeFilterSet.genreFilter, () =>
                    setGenreFilter(null)
                  )}
                {activeFilterSet.difficultyLevelFilter &&
                  filterPill(
                    getFullDifficultyLevel(
                      activeFilterSet.difficultyLevelFilter
                    ),
                    () => setDifficultyLevelFilter(null)
                  )}
              </>
            )}
          </Group>
        </Stack>
        <Modal title="More Filters" opened={opened} onClose={close} centered>
          <Stack>
            <Filter title="Composer">
              <Select
                placeholder="Select composer..."
                data={composerData}
                value={activeFilterSet.composerFilter}
                onChange={(value) => setComposerFilter(value)}
                clearable
                searchable
              />
            </Filter>
            <Filter title="Genre">
              <Select
                placeholder="Select genre..."
                data={genreData}
                value={activeFilterSet.genreFilter}
                onChange={(value) => setGenreFilter(value)}
                clearable
                searchable
              />
            </Filter>
            <Filter title="Accompaniment">
              <Select
                placeholder="Select accompaniment..."
                data={accompanimentData}
                value={activeFilterSet.accompanimentFilter}
                onChange={(value) => setAccompanimentFilter(value)}
                clearable
                searchable
              />
            </Filter>
            <Filter title="Difficulty Level">
              <Select
                placeholder="Select difficulty level..."
                data={difficultyLevelData}
                value={activeFilterSet.difficultyLevelFilter?.toString()}
                onChange={(value) =>
                  setDifficultyLevelFilter(value ? parseInt(value) : null)
                }
                clearable
                searchable
              />
            </Filter>
            <Filter title="Language">
              <Select
                placeholder="Select language..."
                data={languageData}
                value={activeFilterSet.languageFilter}
                onChange={(value) => setLanguageFilter(value)}
                clearable
                searchable
              />
            </Filter>
            <Filter title="Musical Period">
              <Select
                placeholder="Select period..."
                data={musicalPeriodData}
                value={activeFilterSet.musicalPeriodFilter}
                onChange={(value) =>
                  setMusicalPeriodFilter(value as MusicalPeriod)
                }
                clearable
                searchable
              />
            </Filter>
          </Stack>
        </Modal>
      </Card>
    </Tabs>
  );
};

export default Search;
