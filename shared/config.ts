// Global application configuration
// This file contains feature flags and settings that control application behavior

export interface AppConfig {
  // Feature flags
  features: {
    advancedDifficultyEnabled: boolean;
    cloudTTSEnabled: boolean;
    progressionLocksEnabled: boolean;
  };
  
  // Version information
  version: {
    number: string;
    name: string;
  };
}

// Configuration for Version 1
export const APP_CONFIG: AppConfig = {
  features: {
    // Advanced difficulty is locked for Version 1
    // Set to true in future versions to unlock Advanced level
    advancedDifficultyEnabled: false,
    // Cloud TTS (ElevenLabs) enabled for high-quality French pronunciation
    // Set to false to disable and use browser TTS only
    cloudTTSEnabled: true,
    // Course progression locks — each tense behind the previous one,
    // each level behind the level below.
    //
    // OFF as of 14 Sep 2026, deliberately and temporarily. The locks read
    // `completedCourses`, which comes from the API and is always empty in
    // guest mode, so every tense past Present and every level past Beginner
    // was sealed for every visitor and no exam pass could ever open them.
    // Rather than ship half-working gating, everything is open while the
    // exam and persistence work is finished. Set back to true once passing
    // an exam is confirmed to unlock the next step end to end.
    progressionLocksEnabled: false,
  },
  
  version: {
    number: "1.0.0",
    name: "Version 1",
  },
};

// Helper function to check if Advanced difficulty is available
export const isAdvancedDifficultyEnabled = (): boolean => {
  return APP_CONFIG.features.advancedDifficultyEnabled;
};

// Available difficulty levels based on configuration
export const getAvailableDifficulties = () => {
  const baseDifficulties = ["Beginner", "Novice", "Elementary", "Intermediate"];
  
  if (isAdvancedDifficultyEnabled()) {
    return [...baseDifficulties, "Advanced"];
  }
  
  return baseDifficulties;
};

// Check if a difficulty level is allowed
export const isDifficultyAllowed = (difficulty: string): boolean => {
  return getAvailableDifficulties().includes(difficulty);
};

// Check if cloud TTS (ElevenLabs) is enabled
export const isCloudTTSEnabled = (): boolean => {
  return APP_CONFIG.features.cloudTTSEnabled;
};

// Are course progression locks in force? See progressionLocksEnabled above.
export const areProgressionLocksEnabled = (): boolean => {
  return APP_CONFIG.features.progressionLocksEnabled;
};
