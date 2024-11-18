import { Injectable, computed, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { SITE_NAVIGATION } from '../configs/navigation.config';
import { NavItem } from '../models/navigation.types';
import { APP_CONFIG_TOKEN } from '../../app.config';

/**
* Service responsible for managing application navigation state.
* Handles both horizontal (top) navigation and vertical (side) navigation.
*
* Key features:
* - Manages navigation based on SITE_NAVIGATION config
* - Handles dynamic routes for applications/designs
* - Updates vertical nav based on current route
* - Computes dropdown states for horizontal nav
*/
@Injectable({
  providedIn: 'root'
 })
 export class NavigationService {
  // Signals to track navigation state
  private config = inject(APP_CONFIG_TOKEN);
  private navigationSignal = signal<NavItem[]>(this.config.navigation);
  private currentUrl = signal<string>('');
  private verticalNavItems = signal<NavItem[]>([]);

  private router = inject(Router);

  constructor() {
    // Update navigation on route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.currentUrl.set((event as NavigationEnd).url);
      this.updateVerticalNav();
    });
  }

  /**
   * Returns horizontal navigation items with computed dropdown states
   * Used by app-toolbar component
   */
  getHorizontalNav = computed(() =>
    this.navigationSignal()
      .filter(item => item.displayType.includes('horizontal'))
      .map(item => ({
        ...item,
        // Compute dropdown states for items that have non-vertical children
        hasDropdown: item.children?.some(child => !child.displayType.includes('vertical')) ?? false,
        dropdownItems: item.children?.filter(child => !child.displayType.includes('vertical')) ?? []
      }))
  );

  /**
   * Returns current vertical navigation items
   * Used by app-sidenav component
   */
  getVerticalNav = computed(() => this.verticalNavItems());

  /**
   * Updates vertical navigation based on current URL
   * Handles special case for design details route
   */
  private updateVerticalNav() {
    const urlParts = this.currentUrl().split('/');
    const rootSection = urlParts[1];

    // Special handling for applications/designs route
    if (rootSection === 'applications') {
      if (urlParts[3] === 'designs' && urlParts.length >= 5) {
        const designItems = this.getDesignDetailsSideNav(urlParts[2], urlParts[4]);
        this.verticalNavItems.set(designItems);
        return;
      }
      // Clear vertical nav for other application routes
      this.verticalNavItems.set([]);
      return;
    }

    // Handle regular sections
    const sideNavItems = this.getSectionSideNav(rootSection);
    this.verticalNavItems.set(sideNavItems);
  }

  /**
   * Gets navigation items for design details view
   * Replaces :appId and :designId params in paths
   * @param appId - Application ID from route
   * @param designId - Design ID from route
   */
  private getDesignDetailsSideNav(appId: string, designId: string): NavItem[] {
    const appSection = this.navigationSignal().find(item => item.path === '/applications');
    const designNavItems = appSection?.children?.find(item =>
      item.path.includes('/designs'))?.children ?? [];

    return designNavItems.map(item => ({
      ...item,
      path: item.path
        .replace(':appId', appId)
        .replace(':designId', designId)
    }));
  }

  /**
   * Gets vertical navigation items for a given section
   * @param sectionRoot - Root section from URL
   */
  private getSectionSideNav(sectionRoot: string): NavItem[] {
    const navSection = this.navigationSignal().find(item =>
      item.path.includes(sectionRoot) ||
      item.children?.some(child => child.path.includes(sectionRoot))
    );

    return navSection?.children?.filter(child =>
      child.displayType.includes('vertical')
    ) ?? [];
  }
 }
