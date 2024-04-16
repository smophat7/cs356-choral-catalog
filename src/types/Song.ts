import { Mode, MusicalPeriod, Voicing } from "./";

export interface Song {
  id: string;
  title: string;
  composer: string;
  description: string;
  language: string;
  musicalPeriod: MusicalPeriod;
  accompaniment: string;
  voicings: Voicing[];
  mode: Mode;
  coverImageUrl: string;
  durationSeconds: number;
  purchaseUrls: string[];
  // ageLevel: string;
  // gradeDifficulty: string;
  // topicSubject: string;
  // price: number;
  // publisherBrand: string;
  // countryOfOrigin: string;
}
