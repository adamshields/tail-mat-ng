// src/app/core/services/navigation.service.ts
import { inject, Injectable, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { NavItem, NavLocation } from '../models/navigation.types';
import { SITE_NAVIGATION } from '../configs/navigation.config';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private router = inject(Router);
  private activeSideNavItems = signal<NavItem[]>([]);

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => this.updateActiveSideNav());
  }

  private updateActiveSideNav(): void {
    const urlParts = this.router.url.split('/');
    const rootSection = urlParts[1];

    // For applications section
    if (rootSection === 'applications') {
      // Only show navigation for design routes
      if (urlParts[3] === 'designs' && urlParts.length >= 5) {
        const designItems = this.getDesignDetailsSideNav(urlParts[2], urlParts[4]);
        this.activeSideNavItems.set(designItems);
        return;
      }
      // Return empty array for all other application routes
      this.activeSideNavItems.set([]);
      return;
    }

    // Handle other sections
    const sideNavItems = this.getSectionSideNav(rootSection);
    this.activeSideNavItems.set(sideNavItems);
  }

  private getDesignDetailsSideNav(appId: string, designId: string): NavItem[] {
    const appSection = SITE_NAVIGATION.find(item => item.path === '/applications');
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
    const navSection = SITE_NAVIGATION.find(item =>
      item.path.includes(sectionRoot) ||
      item.children?.some(child => child.path.includes(sectionRoot))
    );

    return navSection?.children?.filter(child =>
      child.location.includes('side')
    ) ?? [];
  }

  getCurrentSideNav(): NavItem[] {
    return this.activeSideNavItems();
  }

  getTopNavItems(location: NavLocation): NavItem[] {
    return SITE_NAVIGATION.filter(item =>
      item.location.includes(location) ||
      (location === 'top' && item.children?.some(child =>
        child.location.includes('top')
      ))
    );
  }
}
