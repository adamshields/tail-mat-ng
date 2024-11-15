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

  getHorizontalNav = computed(() =>
    this.navigationSignal()
      .filter(item => item.displayType.includes('horizontal'))
      .map(item => ({
        ...item,
        dropdownItems: item.children?.filter(child =>
          child.displayType.includes('dropdown')) ?? []
      }))
  );

  // Return the active side nav items
  // Get vertical nav based on current route
  getVerticalNav = computed(() => this.verticalNavItems());

  private updateVerticalNav() {
    const urlParts = this.currentUrl().split('/');
    const rootSection = urlParts[1];

    // For applications section
    if (rootSection === 'applications') {
      // Only show navigation for design routes
      if (urlParts[3] === 'designs' && urlParts.length >= 5) {
        const designItems = this.getDesignDetailsSideNav(urlParts[2], urlParts[4]);
        this.verticalNavItems.set(designItems);
        return;
      }
      // Return empty array for all other application routes
      this.verticalNavItems.set([]);
      return;
    }

    // Handle other sections
    const sideNavItems = this.getSectionSideNav(rootSection);
    this.verticalNavItems.set(sideNavItems);
  }

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

  private getSectionSideNav(sectionRoot: string): NavItem[] {
    const navSection = this.navigationSignal().find(item =>
      item.path.includes(sectionRoot) ||
      item.children?.some(child => child.path.includes(sectionRoot))
    );

    return navSection?.children?.filter(child =>
      child.displayType.includes('vertical')
    ) ?? [];
  }

  // // Get dropdown items for a parent item
  // getDropdownItems = computed(() =>
  //   this.navigationSignal().filter(item =>
  //     item.children?.some(child => child.displayType.includes('dropdown'))
  //   )
  // );

}
