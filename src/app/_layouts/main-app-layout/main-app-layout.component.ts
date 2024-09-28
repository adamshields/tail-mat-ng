import { Component, computed, effect, inject, signal } from '@angular/core';
import { MaterialModules } from '../../..';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeManager } from '../../theme-manager.service';
import { ColorPickerComponent } from "../../shared/components/color-picker/color-picker.component";
import { SidenavComponent } from '../../shared/components/sidenav/sidenav.component';
import { MenuItem } from '../../shared/data/menu-item.interface';
import { TOOLBAR_MENU_ITEMS } from '../../shared/data/toolbar-menu-data';
import { SIDENAV_MENU_ITEMS } from '../../shared/data/sidenav-menu-data';
import { SidenavService } from '../../shared/services/sidenav.service';
import { filter, map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-main-app-layout',
  standalone: true,
  imports: [MaterialModules, RouterModule, CommonModule, ColorPickerComponent, SidenavComponent],
  templateUrl: './main-app-layout.component.html',
  styleUrl: './main-app-layout.component.scss'
})
export class MainAppLayoutComponent {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private sidenavService = inject(SidenavService);

  collapsed = signal(false);
  loading = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

  private serviceOverride = toSignal(this.sidenavService.showSidenav$);
  private currentRouteData = signal<{ showSidenav: boolean }>({ showSidenav: false });

  showSidenav = computed(() => {
    const override = this.serviceOverride();
    return override !== null ? override : this.currentRouteData().showSidenav;
  });

  constructor() {
    // effect(() => {
    //   console.log('Sidenav visibility changed:', this.showSidenav());
    // });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.getRouteData()),
      filter((data): data is { showSidenav: boolean } => data !== null)
    ).subscribe(data => {
      this.currentRouteData.set(data);
      this.sidenavService.resetSidenavVisibility();
    });
  }

  private getRouteData(): { showSidenav: boolean } | null {
    let route = this.activatedRoute.snapshot.firstChild;
    while (route?.firstChild) {
      route = route.firstChild;
    }
    return route?.data as { showSidenav: boolean } | null;
  }

  themeManager = inject(ThemeManager);
  isDark$ = this.themeManager.isDark$;

  changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }


  menuItems: MenuItem[] = TOOLBAR_MENU_ITEMS;
  sideNavItems: MenuItem[] = SIDENAV_MENU_ITEMS

}
