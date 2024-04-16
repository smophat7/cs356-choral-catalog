import { Voicing } from "./";

export interface VoicingFilter {
  type: "BasicVoice" | "StandardVoice";
}

export interface StandardVoiceFilter extends VoicingFilter {
  type: "StandardVoice";
  soprano: boolean;
  alto: boolean;
  tenor: boolean;
  bass: boolean;
}

export interface BasicVoiceFilter extends VoicingFilter {
  type: "BasicVoice";
  numParts: number;
}

export enum VoicingCategory {
  SATB = "SATB",
  SA_SSA_SSAA = "SA/SSA/SSAA",
  TB_TBB_TTBB = "TB/TBB/TTBB",
  SAB_ThreePart = "SAB/3-Part Mixed",
  TwoPart = "2-Part",
  Unison = "Unison",
}

export const voicingCategoryToValidStrings: Record<VoicingCategory, string[]> =
  {
    [VoicingCategory.SATB]: ["SATB"],
    [VoicingCategory.SA_SSA_SSAA]: ["SA", "SSA", "SSAA"],
    [VoicingCategory.TB_TBB_TTBB]: ["TB", "TBB", "TTBB"],
    [VoicingCategory.SAB_ThreePart]: ["SAB", "3-Part"],
    [VoicingCategory.TwoPart]: ["2-Part"],
    [VoicingCategory.Unison]: ["Unison"],
  };

export function isInVoicingCategory(
  voicing: Voicing,
  voicingCategory: VoicingCategory
) {
  const validStrings = voicingCategoryToValidStrings[voicingCategory];
  const voicingString = voicing.toString();
  return validStrings.includes(voicingString);
}

// export const voicingCategoryToVoicingFilter: Record<
//   VoicingCategory,
//   VoicingFilter | VoicingFilter[]
// > = {
//   [VoicingCategory.SATB]: {
//     type: "StandardVoice",
//     soprano: true,
//     alto: true,
//     tenor: true,
//     bass: true,
//   } as StandardVoiceFilter,
//   [VoicingCategory.SA_SSA_SSAA]: {
//     type: "StandardVoice",
//     soprano: true,
//     alto: true,
//     tenor: false,
//     bass: false,
//   } as StandardVoiceFilter,
//   [VoicingCategory.TB_TBB_TTBB]: {
//     type: "StandardVoice",
//     soprano: false,
//     alto: false,
//     tenor: true,
//     bass: true,
//   } as StandardVoiceFilter,
//   [VoicingCategory.SAB_ThreePart]: [
//     {
//       type: "StandardVoice",
//       soprano: true,
//       alto: true,
//       tenor: false,
//       bass: false,
//     } as StandardVoiceFilter,
//     {
//       type: "BasicVoice",
//       numParts: 3,
//     } as BasicVoiceFilter,
//   ],
//   [VoicingCategory.TwoPart]: {
//     type: "BasicVoice",
//     numParts: 2,
//   } as BasicVoiceFilter,
//   [VoicingCategory.Unison]: {
//     type: "BasicVoice",
//     numParts: 1,
//   } as BasicVoiceFilter,
// };

// export function isInVoicingCategory(
//   voicingCategory: VoicingCategory,
//   voicing: Voicing
// ): boolean {
//   const voicingFilter = voicingCategoryToVoicingFilter[voicingCategory];
//   if (Array.isArray(voicingFilter)) {
//     return voicingFilter.some((filter) => isInVoicingFilter(filter, voicing));
//   } else {
//     return isInVoicingFilter(voicingFilter, voicing);
//   }
// }

// function isInVoicingFilter(
//   voicingFilter: VoicingFilter,
//   voicing: Voicing
// ): boolean {
//   if (voicingFilter.type === "StandardVoice") {
//     const standardVoiceFilter = voicingFilter as StandardVoiceFilter;
//     const standardVoices = voicing.voices as StandardVoice[];
//     for (const standardVoice of standardVoices) {
//       if (
//         (standardVoiceFilter.soprano && standardVoice.part === "soprano") ||
//         (standardVoiceFilter.alto && standardVoice.part === "alto") ||
//         (standardVoiceFilter.tenor && standardVoice.part === "tenor") ||
//         (standardVoiceFilter.bass && standardVoice.part === "bass")
//       ) {
//         return true;
//       }
//     }
//     return false;
//   } else {
//     const basicVoiceFilter = voicingFilter as BasicVoiceFilter;
//     const basicVoices = voicing.voices as BasicVoice[];
//     if (basicVoices.length !== basicVoiceFilter.numParts) {
//       return false;
//     }
//     return true;
//   }
// }
