import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FeatureFlagService } from './feature-flag.service';

/**
 * Represents the structure of the application's configuration.
 */
interface AppConfig {
  env: string; // The environment name, e.g., 'development', 'production', etc.
}

/**
 * Service responsible for loading, managing, and caching the application's configuration settings.
 *
 * This service interacts with the backend to fetch the configuration and also handles caching
 * to ensure the application can operate in case the server is unavailable.
 */
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  /** Base URL for the backend API. */
  private readonly API_SPRING_URL = 'http://localhost:8000';

  /** Endpoint for fetching the UI configuration. */
  private readonly CONFIG_ENDPOINT = '/ui-config/ui-settings';

  /** Key used for caching the configuration in local storage. */
  private readonly CONFIG_CACHE_KEY = 'appConfig';

  /** BehaviorSubject to hold the application's configuration state. */
  private configSubject = new BehaviorSubject<AppConfig | null>(null);

  constructor(private http: HttpClient, private featureFlagService: FeatureFlagService) {}

  /**
   * Loads the application configuration from the server.
   * If the server is not available, attempts to load a cached configuration.
   *
   * @returns {Observable<AppConfig>} Observable emitting the loaded or cached configuration.
   */
  loadConfig(): Observable<AppConfig> {
    return this.http.get<AppConfig>(`${this.API_SPRING_URL}${this.CONFIG_ENDPOINT}`).pipe(
      tap(config => this.handleNewConfig(config)),
      catchError(error => this.handleConfigError(error))
    );
  }

  /**
   * Processes and caches the new configuration, ensuring that the environment is set first,
   * followed by setting up feature flags.
   *
   * @param {AppConfig} config - The newly loaded configuration.
   */
  private handleNewConfig(config: AppConfig): void {
    // Set the environment first
    this.setEnvironment(config.env);

    // Update the internal state with the new configuration.
    this.configSubject.next(config);

    // Cache the configuration for future use.
    this.cacheConfig(config);

    // Set up feature flags using the FeatureFlagService.
    this.featureFlagService.setFeatureFlags((config as any).featureFlags);
  }

  /**
   * Handles errors during configuration loading by attempting to load a cached configuration.
   *
   * @param {any} error - The error that occurred during configuration loading.
   * @returns {Observable<AppConfig>} Observable emitting the cached configuration if available.
   */
  private handleConfigError(error: any): Observable<AppConfig> {
    console.error('Failed to load configuration:', error);
    const cachedConfig = this.loadCachedConfig();
    if (cachedConfig) {
      console.log('Using cached configuration');
      this.handleNewConfig(cachedConfig);
      return of(cachedConfig);
    }
    throw new Error('No configuration available');
  }

  /**
   * Caches the configuration in local storage for later use.
   *
   * @param {AppConfig} config - The configuration to cache.
   */
  private cacheConfig(config: AppConfig): void {
    localStorage.setItem(this.CONFIG_CACHE_KEY, JSON.stringify(config));
  }

  /**
   * Loads the cached configuration from local storage.
   *
   * @returns {AppConfig | null} The cached configuration, or null if none exists.
   */
  private loadCachedConfig(): AppConfig | null {
    const cached = localStorage.getItem(this.CONFIG_CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  }

  /**
   * Sets the environment for the application in session storage.
   *
   * @param {string} env - The environment to set, such as 'production' or 'development'.
   */
  private setEnvironment(env: string): void {
    if (env) {
      sessionStorage.setItem('env', env);
      console.log('Environment set:', env);
    }
  }

  /**
   * Returns an observable of the current configuration.
   *
   * @returns {Observable<AppConfig | null>} Observable emitting the current configuration.
   */
  getConfig(): Observable<AppConfig | null> {
    return this.configSubject.asObservable();
  }
}
