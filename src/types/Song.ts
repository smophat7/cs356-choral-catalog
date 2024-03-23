import { Mode, MusicalPeriod, Voicing } from "./";

export interface Song {
  title: string;
  composer: string;
  description: string;
  language: string;
  musicalPeriod: MusicalPeriod;
  voicing: Voicing;
  mode: Mode;
  coverImageUrl: string;
  // ageLevel: string;
  // gradeDifficulty: string;
  // topicSubject: string;
  // accompaniment: string;
  // price: number;
  // publisherBrand: string;
  // countryOfOrigin: string;
}
