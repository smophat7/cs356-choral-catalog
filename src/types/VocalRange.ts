import { Note } from "./";

export interface VocalRange {
  low: NotePitch;
  high: NotePitch;
  lowOptional?: NotePitch;
  highOptional?: NotePitch;
}

/**
 * A specific note pitch using Scientific Pitch Notation.
 */
export interface NotePitch {
  note: Note;
  octave: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}
