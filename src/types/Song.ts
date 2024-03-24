import { Mode, MusicalPeriod, Voicing } from "./";

export interface Song {
  id: string;
  title: string;
  composer: string;
  description: string;
  language: string;
  musicalPeriod: MusicalPeriod;
  voicings: Voicing[];
  mode: Mode;
  coverImageUrl: string;
  durationSeconds: number;
  // ageLevel: string;
  // gradeDifficulty: string;
  // topicSubject: string;
  // accompaniment: string;
  // price: number;
  // publisherBrand: string;
  // countryOfOrigin: string;
}
