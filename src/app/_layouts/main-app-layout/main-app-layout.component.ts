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
            (collapsedChange)="collapsed.set($event)"
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
/**
 * MainAppLayoutComponent
 *
 * Primary layout component managing the application's main structure including
 * sidenav state, theme management, and loading states.
 *
 * Dependencies:
 * - NavigationService: Manages navigation state and sidenav items
 * - ThemeManager: Handles theme switching and state
 *
 * Related Components:
 * - AppToolbarComponent: Receives theme state
 * - SidenavComponent: Receives collapsed state
 * - MatSidenavContainer: Manages sidenav layout
 */
@Component({
  selector: 'app-main-app-layout',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainAppLayoutComponent {
  // === Dependencies ===
  private readonly navigationService = inject(NavigationService);
  private readonly themeManager = inject(ThemeManager);

  // === State Management ===
  /**
   * Controls the collapsed state of the sidenav
   * Consumed by: SidenavComponent
   */
  protected readonly collapsed = signal<boolean>(false);

  /**
   * Controls loading state for content area
   * Used in: Router outlet container
   */
  protected readonly loading = signal<boolean>(false);

  /**
   * Observable for current theme state
   * Consumed by: AppToolbarComponent
   */
  protected readonly isDark$ = this.themeManager.isDark$;

  // === Computed Properties ===
  /**
   * Determines if sidenav should be displayed
   * Dependencies: navigationService.getCurrentSideNav()
   * Used in: Template *ngIf condition
   */
  protected readonly showSidenav = computed(() =>
    this.navigationService.getCurrentSideNav().length > 0
  );

  /**
   * Calculates current sidenav width based on collapse state
   * Dependencies: collapsed signal, showSidenav computed
   * Used in: MatSidenav width binding
   */
  protected readonly sidenavWidth = computed(() => {
    if (!this.showSidenav()) return '0px';
    return this.collapsed() ? '65px' : '250px';
  });

  // === Lifecycle & Effects ===
  constructor() {
    // Debug effect for monitoring layout changes
    effect(() => {
      console.log('MAIN APP LAYOUT:', {
        collapsed: this.collapsed(),
        sidenavWidth: this.sidenavWidth(),
        showSidenav: this.showSidenav()
      });
    });
  }

  // === Public Methods ===
  /**
   * Updates application theme
   * @param theme - The theme to switch to ('light' | 'dark' | 'system')
   * Called by: AppToolbarComponent
   */
  protected changeTheme(theme: string): void {
    this.themeManager.changeTheme(theme);
  }
}

/**
 * Component Relations Diagram:
 *
 * MainAppLayoutComponent
 * ├── AppToolbarComponent
 * │   ├── Input: none
 * │   └── Shared State: isDark$ (via ThemeManager)
 * │
 * ├── MatSidenavContainer
 * │   └── Binding: [style.width]="sidenavWidth()"
 * │
 * └── SidenavComponent
 *     ├── Input: [collapsed]="collapsed()"
 *     ├── Output: (collapsedChange)="collapsed.set($event)"
 *     └── Children: SidenavMenuItemComponent[]
 *
 * Service Dependencies:
 * ├── NavigationService
 * │   └── Methods Used: getCurrentSideNav()
 * │
 * └── ThemeManager
 *     ├── Properties Used: isDark$
 *     └── Methods Used: changeTheme()
 */

/**
 * State Flow:
 *
 * 1. Sidenav State:
 *    collapsed signal → sidenavWidth computed → SidenavComponent → SidenavMenuItemComponent
 *
 * 2. Navigation State:
 *    NavigationService.getCurrentSideNav() → showSidenav computed → Template conditions
 *
 * 3. Theme State:
 *    ThemeManager.isDark$ → AppToolbarComponent → Theme display
 */
