import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { take } from 'rxjs/operators';
import { BrowserStorageService } from './browser-storage.service';

const LOCAL_STORAGE_KEY = 'my-app';

@Injectable({ providedIn: 'root' })
export class ThemeManager {
  private document = inject(DOCUMENT);
  private browserStorage = inject(BrowserStorageService);
  private _isDarkSub = new BehaviorSubject(false);
  isDark$ = this._isDarkSub.asObservable();
  private _window = this.document.defaultView;

  private _colorSub = new BehaviorSubject('#6750a4');
  color$ = this._colorSub.asObservable();

  private _densitySub = new BehaviorSubject('0');
  density$ = this._densitySub.asObservable();

  constructor() {
    this.setTheme(this.getPreferredTheme());
    this.setColor(this.getStoredColor());
    this.setDensity(this.getStoredDensity());
    if (this._window !== null && this._window.matchMedia) {
      this._window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => {
          const storedTheme = this.getStoredTheme();
          if (storedTheme !== 'light' && storedTheme !== 'dark') {
            this.setTheme(this.getPreferredTheme());
          }
        });
    }
  }

  getStoredSettings = () =>
    JSON.parse(this.browserStorage.get(LOCAL_STORAGE_KEY) ?? '{}');

  setStoredSettings = (settings: any) => {
    this.browserStorage.set(LOCAL_STORAGE_KEY, JSON.stringify(settings));
  };

  getStoredTheme = () => this.getStoredSettings().theme;
  getStoredColor = () => this.getStoredSettings().color ?? '#6750a4';
  getStoredDensity = () => this.getStoredSettings().density ?? '0';

  setStoredTheme = (theme: string) => {
    const settings = this.getStoredSettings();
    settings.theme = theme;
    this.setStoredSettings(settings);
  };

  setStoredColor = (color: string) => {
    const settings = this.getStoredSettings();
    settings.color = color;
    this.setStoredSettings(settings);
  };

  setStoredDensity = (density: string) => {
    const settings = this.getStoredSettings();
    settings.density = density;
    this.setStoredSettings(settings);
  };

  getPreferredTheme = (): 'dark' | 'light' => {
    const storedTheme = this.getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    if (this._window !== null && this._window.matchMedia) {
      return this._window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'light';
  };

  setTheme = (theme: string) => {
    if (this._window !== null && this._window.matchMedia) {
      if (
        theme === 'auto' &&
        this._window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        this.document.documentElement.setAttribute('data-bs-theme', 'dark');
        this._isDarkSub.next(true);
      } else {
        this.document.documentElement.setAttribute('data-bs-theme', theme);
        this._isDarkSub.next(theme === 'dark');
      }
      this.setMaterialTheme();
    }
  };

  setColor = (color: string) => {
    this._colorSub.next(color);
    // this.applyColorTheme(color);
  };

  setDensity = (density: string) => {
    this._densitySub.next(density);
    this.applyDensity(density);
  };

  setMaterialTheme() {
    this.isDark$.pipe(take(1)).subscribe((isDark) => {
      if (isDark) {
        const href = 'dark-theme.css';
        getLinkElementForKey('dark-theme').setAttribute('href', href);
        this.document.documentElement.classList.add('dark-theme');
      } else {
        this.removeStyle('dark-theme');
        this.document.documentElement.classList.remove('dark-theme');
      }
    });
  }

  removeStyle(key: string) {
    const existingLinkElement = getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      this.document.head.removeChild(existingLinkElement);
    }
  }

  changeTheme(theme: string) {
    this.setStoredTheme(theme);
    this.setTheme(theme);
  }

  changeColor(color: string) {
    this.setStoredColor(color);
    this.setColor(color);
  }

  changeDensity(density: string) {
    this.setStoredDensity(density);
    this.setDensity(density);
  }

  // private applyColorTheme(color: string) {
  //   // Implement the color theme application logic here
  //   // This might involve using the Material Color Utilities or a similar approach
  // }

  private applyDensity(density: string) {
    const root = this.document.documentElement;
    root.style.setProperty('--density-scale', density);
    // You might need to update other density-related styles here
  }
}


function getLinkElementForKey(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(
    `link[rel="stylesheet"].${getClassNameForKey(key)}`
  );
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.classList.add(getClassNameForKey(key));
  document.head.appendChild(linkEl);
  return linkEl;
}

function getClassNameForKey(key: string) {
  return `style-manager-${key}`;
}
