import { Note } from "./";

export interface Mode {
  tonic: Note;
  mode: ModeType;
}

export enum ModeType {
  Ionian = "Ionian",
  Dorian = "Dorian",
  Phrygian = "Phrygian",
  Lydian = "Lydian",
  Mixolydian = "Mixolydian",
  Aeolian = "Aeolian",
  Locrian = "Locrian",
}
