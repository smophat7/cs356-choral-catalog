import { DifficultyLevel, ModeType } from "../types";

export const getFriendlyModeType = (mode: ModeType) => {
  if (mode === "Ionian") return "Major";
  if (mode === "Aeolian") return "Minor";
  return mode;
};

export const getFriendlySongDuration = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (seconds < 10) {
    return `${minutes}:0${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
};

export const getFullDifficultyLevel = (
  difficultyLevel: DifficultyLevel
): string => `${difficultyLevel}: ${DifficultyLevel[difficultyLevel]}`;
