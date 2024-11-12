
// src/app/core/services/navigation.service.ts
import { inject, Injectable, signal } from '@angular/core';
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
  private router = inject(Router);
  // constructor(private router: Router) {}

  getSideNavigation(): Observable<NavItem[]> {
    return this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        const rootSection = this.router.url.split('/')[1];
        return this.findSideNavItems(rootSection);
      })
    );
  }

  private findSideNavItems(rootSection: string): NavItem[] {
    const navSection = SITE_NAVIGATION.find(item =>
      item.path.includes(rootSection) ||
      item.children?.some(child => child.path.includes(rootSection))
    );

    return navSection?.children?.filter(child =>
      child.location.includes('side')
    ) ?? [];
  }

  getNavigation(location: NavLocation): Observable<NavItem[]> {
    return this.navigationItems.pipe(
      map(items => this.filterByLocation(items, location))
    );
  }

  private filterByLocation(items: NavItem[], location: NavLocation): NavItem[] {
    return items.filter(item =>
      item.location.includes(location) ||
      (location === 'top' && item.children?.some(child =>
        child.location.includes('top')
      ))
    );
  }
}
