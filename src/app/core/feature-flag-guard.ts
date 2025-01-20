import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { FeatureFlagService } from './feature-flag.service';

/**
 * A function guard that checks if a route can be activated based on the state of specific feature flags.
 *
 * This guard checks the feature flags specified in the route's data property. It ensures that all specified
 * feature flags are enabled before allowing access to the route. If any of the required feature flags are
 * disabled, access to the route is denied.
 *
 * @param route - The current route snapshot, which contains the feature flags in its data property.
 * @param state - The current router state snapshot.
 * @returns {boolean} True if all specified feature flags are enabled, otherwise false.
 */
export const featureFlagGuard: CanActivateFn = (route, state) => {
  const featureFlagService = inject(FeatureFlagService);
  const featureFlags = route.data['featureFlags'] as string[];

  // All specified flags must be true for access to be granted
  return featureFlags.every(flag => featureFlagService.isFeatureEnabled(flag));
};
