import {
  BasicVoice,
  Mode,
  MusicalPeriod,
  SheetMusicPreview,
  Song,
  StandardVoice,
  Voicing,
} from "../types";

interface RawVoicingData {
  voices: StandardVoice[] | BasicVoice[];
  sheetMusicPreview: SheetMusicPreview;
  audioUrl: string;
  videoUrl: string;
}

export interface RawSongData {
  id: string;
  title: string;
  composer: string;
  description: string;
  language: string;
  musicalPeriod: MusicalPeriod;
  genre: string;
  accompaniment: string;
  difficultyLevel: number;
  voicings: RawVoicingData[];
  mode: Mode;
  coverImageUrl: string;
  durationSeconds: number;
  purchaseUrls: string[];
}

export function parseSongData(songData: RawSongData[]): Song[] {
  const songs: Song[] = [];

  for (const song of songData) {
    const voicings: Voicing[] = song.voicings.map(
      (rawVoicing: RawVoicingData) => {
        const voicesType: string = rawVoicing.voices[0].type;
        let voices: StandardVoice[] | BasicVoice[] = [];
        if (voicesType === "StandardVoice") {
          voices = getStandardVoices(rawVoicing.voices);
        } else if (voicesType === "BasicVoice") {
          voices = getBasicVoices(rawVoicing.voices);
        } else {
          throw new Error("Invalid voice type");
        }
        return new Voicing(
          voices,
          rawVoicing.sheetMusicPreview,
          rawVoicing.audioUrl,
          rawVoicing.videoUrl
        );
      }
    );

    songs.push({
      id: song.id,
      title: song.title,
      composer: song.composer,
      description: song.description,
      language: song.language,
      musicalPeriod: song.musicalPeriod,
      genre: song.genre,
      accompaniment: song.accompaniment,
      difficultyLevel: song.difficultyLevel,
      voicings: voicings,
      mode: song.mode,
      coverImageUrl: song.coverImageUrl,
      durationSeconds: song.durationSeconds,
      purchaseUrls: song.purchaseUrls,
    });
  }

  songs.sort((a, b) => a.title.localeCompare(b.title));

  return songs;
}

function getStandardVoices(
  voices: StandardVoice[] | BasicVoice[]
): StandardVoice[] {
  if (voices[0].type !== "StandardVoice") {
    throw new Error("Invalid voice type");
  }
  return voices as StandardVoice[];
}

function getBasicVoices(voices: StandardVoice[] | BasicVoice[]): BasicVoice[] {
  if (voices[0].type !== "BasicVoice") {
    throw new Error("Invalid voice type");
  }
  return voices as BasicVoice[];
}
