import { SheetMusicPreview, VocalRange } from "./";

/**
 * SATB part voicing.
 */
export interface StandardVoice {
  type: "StandardVoice";
  part: "soprano" | "alto" | "tenor" | "bass";
  range: VocalRange;
}

/**
 * A basic voice is a voice that is not categorized as soprano, alto, tenor, or bass.
 * Instead, it is categorized by part number (1, 2, 3, 4, etc.).
 * For use in music that is Unison, 2-Part, 3-Part, etc.
 */
export interface BasicVoice {
  type: "BasicVoice";
  part: number;
  range: VocalRange;
}

/**
 * A voicing is a collection of voices.
 * For example, SATB is a voicing with 4 voices.
 */
export class Voicing {
  voices: StandardVoice[] | BasicVoice[];
  sheetMusicPreview: SheetMusicPreview;

  constructor(
    voices: StandardVoice[] | BasicVoice[],
    sheetMusicPreview: SheetMusicPreview
  ) {
    this.voices = voices;
    this.sheetMusicPreview = sheetMusicPreview;

    // Validate that the part numbers are correct for BasicVoice (must be 1, 2, 3, 4, etc.)
    // For example, if there are 3 BasicVoices, the parts should be 1, 2, 3
    if (this.voicingType() === "BasicVoice") {
      const basicVoices = this.voices as BasicVoice[];
      for (let i = 0; i < basicVoices.length; i++) {
        if (basicVoices[i].part !== i + 1) {
          throw new Error("Invalid BasicVoice part number");
        }
      }
    }
  }

  voicingType(): "StandardVoice" | "BasicVoice" {
    return this.voices[0].type;
  }

  /**
   * Returns a string representation of the voicing.
   * For example, "SA", "SAATBB", "Unison" or "2-Part".
   * @returns {string} A string representation of the voicing.
   */
  toString(): string {
    if (this.voicingType() === "StandardVoice") {
      const standardVoices = this.voices as StandardVoice[];
      return standardVoices
        .map((voice: StandardVoice) => voice.part[0].toUpperCase())
        .join("");
    } else if (this.voicingType() === "BasicVoice") {
      const basicVoices = this.voices as BasicVoice[];
      if (basicVoices.length === 1) {
        return "Unison";
      } else {
        return `${basicVoices.length}-Part`;
      }
    } else {
      throw new Error("Invalid voicing type");
    }
  }
}
