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
}

export interface RawSongData {
  id: string;
  title: string;
  composer: string;
  description: string;
  language: string;
  musicalPeriod: MusicalPeriod;
  voicings: RawVoicingData[];
  mode: Mode;
  coverImageUrl: string;
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
        return new Voicing(voices, rawVoicing.sheetMusicPreview);
      }
    );

    songs.push({
      id: song.id,
      title: song.title,
      composer: song.composer,
      description: song.description,
      language: song.language,
      musicalPeriod: song.musicalPeriod,
      voicings: voicings,
      mode: song.mode,
      coverImageUrl: song.coverImageUrl,
    });
  }

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
