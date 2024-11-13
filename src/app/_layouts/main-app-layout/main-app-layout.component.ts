import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { MaterialModules } from '../../../mat-index';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeManager } from '../../theme-manager.service';
import { ColorPickerComponent } from "../../shared/components/color-picker/color-picker.component";
import { SidenavComponent } from '../../shared/components/sidenav/sidenav.component';
import { ResponsiveHelperComponent } from '../../../@breaker/components/responsive-helper/responsive-helper.component';
import { AppToolbarComponent } from "../../../@breaker/components/app-toolbar/app-toolbar.component";
import { NavigationService } from '../../core/services/navigation.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main-app-layout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ...MaterialModules,
    RouterModule,
    CommonModule,
    ColorPickerComponent,
    SidenavComponent,
    ResponsiveHelperComponent,
    AppToolbarComponent
  ],
  template: `
  <!-- <div class="flex h-screen flex-col"> -->
    <app-toolbar></app-toolbar>

    <mat-sidenav-container class="mat-elevation-z4">
      @if (showSidenav()) {
        <mat-sidenav

          [opened]="true"
          mode="side"
          [style.width]="sidenavWidth()"
        >
        <app-sidenav
        [collapsed]="collapsed()"
        (collapsedChange)="toggleCollapsed()"
      />
        </mat-sidenav>
      }

      <mat-sidenav-content
        class="p-5 transition-[margin-left] duration-500"
        [style.marginLeft]="sidenavWidth()"
      >
        @if (loading()) {
          <div class="flex justify-center items-center h-full">
            <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
          </div>
        } @else {
          <ng-container #content>
            <app-responsive-helper></app-responsive-helper>
            <router-outlet></router-outlet>
          </ng-container>
        }
      </mat-sidenav-content>
    </mat-sidenav-container>
  <!-- </div> -->

  `,
  styles: `
  @use '@angular/material' as mat;

  mat-sidenav-container {
    height: calc(100vh - 64px);

  }
  mat-sidenav,
  mat-sidenav-content {
    transition: all 500ms ease-in-out;
  }
  mat-sidenav {
    box-shadow: var(--mat-app-elevation-shadow-level-8);
    @include mat.sidenav-overrides((
      // container-background-color: orange,
      container-text-color: red,
      container-shape: rectangle,
      // container-elevation-shadow: var(--mat-app-elevation-shadow-level-8),
      container-divider-color: var(--sys-on-surface-variant),
    ));
  }
  `,
})
export class MainAppLayoutComponent {
  private navigationService = inject(NavigationService);
  private themeManager = inject(ThemeManager);
  private router = inject(Router);

  collapsed = signal(false);
  loading = signal(false);
  isDark$ = this.themeManager.isDark$;
  showSidenav = () => this.navigationService.getCurrentSideNav().length > 0;

  sidenavWidth = computed(() => {
    if (!this.showSidenav()) return '0px';
    return this.collapsed() ? '65px' : '250px';
  });
  constructor() {
    effect(() => {
      console.log('MAIN APP LAYOUT:');
    });
  }

  toggleCollapsed() {
    console.log('toggleCollapsed');
    this.collapsed.update(v => !v);
  }

  changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }
}
  // constructor() {
  //   // Log sidenav state changes for debugging
  //   effect(() => {
  //     console.log('Sidenav state:', {
  //       collapsed: this.collapsed(),
  //       hasItems: this.hasSideNavItems(),
  //       width: this.sidenavWidth(),
  //       margin: this.contentMargin()
  //     });
  //   });

  //   // Optional: Subscribe to route changes if you need to trigger any specific updates
  //   this.router.events.pipe(
  //     filter((event): event is NavigationEnd => event instanceof NavigationEnd)
  //   ).subscribe(() => {
  //     // Handle any route change specific logic here if needed
  //   });
  // }

  // onCollapsedChange(isCollapsed: boolean) {
  //   console.log('isCollapsed:', isCollapsed);
  //   this.collapsed.set(isCollapsed);
    // sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');
  // }
