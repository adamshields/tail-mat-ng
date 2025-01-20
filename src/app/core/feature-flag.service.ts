import { Injectable } from '@angular/core';

/**
 * Interface representing the structure of feature flags.
 * Each key is a feature name, and the value is a boolean indicating if the feature is enabled.
 */
interface FeatureFlags {
  [key: string]: boolean;
}

/**
 * Service responsible for managing feature flags in the application.
 *
 * This service allows setting, caching, retrieving, and checking feature flags, enabling feature toggles
 * across the application. It uses local storage for persistence between sessions.
 */
@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {
  /** Key used for caching feature flags in local storage. */
  private readonly FEATURE_FLAGS_CACHE_KEY = 'featureFlags';

  /** Object to hold the current feature flags state. */
  private featureFlags: FeatureFlags = {};

  constructor() {
    this.loadFeatureFlags();
  }

  /**
   * Sets the feature flags and caches them in local storage.
   *
   * @param {FeatureFlags} featureFlags - The feature flags to be set and cached.
   */
  setFeatureFlags(featureFlags: FeatureFlags): void {
    this.featureFlags = featureFlags;
    this.cacheFeatureFlags(featureFlags);
  }

  /**
   * Caches the feature flags in local storage.
   *
   * @param {FeatureFlags} featureFlags - The feature flags to be cached.
   */
  private cacheFeatureFlags(featureFlags: FeatureFlags): void {
    localStorage.setItem(this.FEATURE_FLAGS_CACHE_KEY, JSON.stringify(featureFlags));
  }

  /**
   * Loads feature flags from local storage.
   * Called on service initialization to restore previously cached flags.
   */
  private loadFeatureFlags(): void {
    const cachedFlags = localStorage.getItem(this.FEATURE_FLAGS_CACHE_KEY);
    if (cachedFlags) {
      this.featureFlags = JSON.parse(cachedFlags);
    }
  }

  /**
   * Returns a copy of the current feature flags.
   *
   * @returns {FeatureFlags} - A copy of the current feature flags.
   */
  getFeatureFlags(): FeatureFlags {
    return {...this.featureFlags};
  }

  /**
   * Checks if a specific feature is enabled based on the current feature flags.
   *
   * @param {string} featureName - The name of the feature to check.
   * @returns {boolean} - True if the feature is enabled, otherwise false.
   */
  isFeatureEnabled(featureName: string): boolean {
    return !!this.featureFlags[featureName];
  }

  /**
   * Updates a single feature flag and caches the updated flags.
   *
   * @param {string} featureName - The name of the feature to update.
   * @param {boolean} isEnabled - The new state of the feature flag.
   */
  updateFeatureFlag(featureName: string, isEnabled: boolean): void {
    this.featureFlags[featureName] = isEnabled;
    this.cacheFeatureFlags(this.featureFlags);
  }
}
