import { Injectable, computed, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { SITE_NAVIGATION } from '../configs/navigation.config';
import { NavItem } from '../models/navigation.types';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private navigationSignal = signal<NavItem[]>(SITE_NAVIGATION);
  private currentUrl = signal<string>('');
  private router = inject(Router);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.currentUrl.set((event as NavigationEnd).url);
      this.updateVerticalNav();
    });
  }
  private verticalNavItems = signal<NavItem[]>([]);

  // navigation.service.ts
  getHorizontalNav = computed(() =>
    this.navigationSignal()
      .filter(item => item.displayType.includes('horizontal'))
      .map(item => ({
        ...item,
        hasDropdown: item.children?.some(child => !child.displayType.includes('vertical')) ?? false,
        dropdownItems: item.children?.filter(child => !child.displayType.includes('vertical')) ?? []
      }))
  );

  /**
   * Computed property to get the vertical navigation items.
   */
  getVerticalNav = computed(() => this.verticalNavItems());

  /**
   * Updates the vertical navigation items based on the current URL.
   * Handles different sections and updates the vertical navigation items accordingly.
   */
  private updateVerticalNav() {
    const urlParts = this.currentUrl().split('/');
    const rootSection = urlParts[1];

    if (rootSection === 'applications') {
      if (urlParts[3] === 'designs' && urlParts.length >= 5) {
        const designItems = this.getDesignDetailsSideNav(urlParts[2], urlParts[4]);
        this.verticalNavItems.set(designItems);
        return;
      }
      this.verticalNavItems.set([]);
      return;
    }

    const sideNavItems = this.getSectionSideNav(rootSection);
    this.verticalNavItems.set(sideNavItems);
  }

  /**
   * Gets the side navigation items for the design details section.
   * Replaces placeholders in the path with actual appId and designId.
   *
   * @param appId - The application ID.
   * @param designId - The design ID.
   * @returns An array of navigation items for the design details section.
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
   * Gets the side navigation items for a given section.
   * Filters the navigation items to include only those with 'vertical' display type.
   *
   * @param sectionRoot - The root path of the section.
   * @returns An array of navigation items for the section.
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
