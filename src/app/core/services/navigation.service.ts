
// src/app/core/services/navigation.service.ts
import { Injectable, signal } from '@angular/core';
import { Theme } from '../models/theme.model';
import { effect } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, filter, Observable, map, startWith } from 'rxjs';
import { PORTFOLIO_NAVIGATION } from '../configs/portfolio-navigation.config';
import { PROJECT_NAVIGATION } from '../configs/project-navigation.config';
import { NavItem, NavLocation } from '../models/navigation.types';
import { SITE_NAVIGATION } from '../configs/navigation.config';

// src/app/core/services/navigation.service.ts
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly navigationItems = new BehaviorSubject<NavItem[]>(SITE_NAVIGATION);

  constructor(private router: Router) {
    // Log initial navigation items
    console.log('Initial SITE_NAVIGATION:', SITE_NAVIGATION);
  }

  getSideNavigation(): Observable<NavItem[]> {
    return this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        const currentUrl = this.router.url;
        console.log('Current URL:', currentUrl);

        const sections = currentUrl.split('/');
        console.log('URL sections:', sections);

        // Fix: Changed from sections[0] to sections[1] since first segment after split would be empty
        const rootSection = sections[1]; // e.g., 'projects', 'applications'
        console.log('Root section:', rootSection);

        // Find the matching navigation section
        const navSection = SITE_NAVIGATION.find(item => {
          const matchesPath = item.path.includes(rootSection);
          const matchesChildren = item.children?.some(child => child.path.includes(rootSection));
          console.log(`Checking section ${item.id}:`, {
            path: item.path,
            matchesPath,
            matchesChildren
          });
          return matchesPath || matchesChildren;
        });

        console.log('Found nav section:', navSection);

        if (!navSection) {
          console.log('No matching section found');
          return [];
        }

        // If the section has sidenav children, return those
        const sidenavChildren = navSection.children?.filter(child => {
          const isSideNav = child.location.includes('side');
          console.log(`Checking child ${child.id}:`, {
            location: child.location,
            isSideNav
          });
          return isSideNav;
        }) ?? [];

        console.log('Sidenav children:', sidenavChildren);
        return sidenavChildren;
      })
    );
  }

  getNavigation(location: NavLocation): Observable<NavItem[]> {
    console.log('Getting navigation for location:', location);
    return this.navigationItems.pipe(
      map(items => {
        const filteredItems = this.filterItemsByLocation(items, location);
        console.log(`Filtered items for ${location}:`, filteredItems);
        return filteredItems;
      })
    );
  }

  private filterItemsByLocation(items: NavItem[], location: NavLocation): NavItem[] {
    return items.filter(item => {
      const itemInLocation = item.location.includes(location);
      console.log(`Checking item ${item.id}:`, {
        location: item.location,
        requestedLocation: location,
        itemInLocation
      });

      if (location === 'top') {
        const hasTopChildren = item.children?.some(child => {
          const isTop = child.location.includes('top');
          console.log(`Checking child ${child.id} for top location:`, {
            location: child.location,
            isTop
          });
          return isTop;
        });
        console.log(`Item ${item.id} hasTopChildren:`, hasTopChildren);
        return itemInLocation || hasTopChildren;
      }

      return itemInLocation;
    });
  }
}
