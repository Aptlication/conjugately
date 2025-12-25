// Global application configuration
// This file contains feature flags and settings that control application behavior

export interface AppConfig {
  // Feature flags
  features: {
    advancedDifficultyEnabled: boolean;
    cloudTTSEnabled: boolean;
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