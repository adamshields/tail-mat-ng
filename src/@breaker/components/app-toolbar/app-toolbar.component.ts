import { ChangeDetectionStrategy, Component, effect, inject, input } from '@angular/core';
import { MaterialModules } from '../../../mat-index';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../../app/shared/data/menu-item.interface';
import { TOOLBAR_MENU_ITEMS } from '../../../app/shared/data/toolbar-menu-data';
import { ThemeManager } from '../../../app/theme-manager.service';
import { NavigationService } from '../../../app/core/services/navigation.service';

import { ColorPaletteComponent } from '../../../app/_pages/color-palette/color-palette.component';
import { ColorPickerComponent } from "../../../app/shared/components/color-picker/color-picker.component";
import { NavItem } from '../../../app/core/models/navigation.types';
import { APP_CONFIG_TOKEN } from '../../../app/app.config';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [...MaterialModules, RouterModule, CommonModule, ColorPaletteComponent, ColorPickerComponent],
  template: `
    <mat-toolbar class="toolbar relative mat-elevation-z8 z-10">
      <!-- Logo -->
      <div class="flex items-center justify-start">
        <span class="text-xl font-bold" routerLink="/">{{appName}}</span>
        <mat-icon class="text-2xl ml-2">bolt</mat-icon>
      </div>

      <!-- Menu Items -->
      <nav class="flex space-x-1">
      @for (item of horizontalNavItems(); track item.id) {
        @if (!item.hasDropdown) {
          <button mat-button [routerLink]="[item.path]">
            <mat-icon>{{item.icon}}</mat-icon>
            {{item.label}}
          </button>
        } @else {
          <button mat-button [matMenuTriggerFor]="menu">
            <mat-icon>{{item.icon}}</mat-icon>
            {{item.label}}
            <mat-icon>arrow_drop_down</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            @for (child of item.dropdownItems; track child.id) {
              <button mat-menu-item [routerLink]="[child.path]">
                <mat-icon>{{child.icon}}</mat-icon>
                {{child.label}}
              </button>
            }
          </mat-menu>
        }
      }
    </nav>

      <span class="flex-1"></span>

      <app-color-picker/>
      <!-- Theme Toggler -->
      <button
        mat-icon-button
        class="theme-toggle"
        aria-label="Change theme"
        [matMenuTriggerFor]="themeMenu"
      >
        <mat-icon>{{
          (isDark$ | async) === true ? "dark_mode" : "light_mode"
        }}</mat-icon>
      </button>
      <mat-menu #themeMenu="matMenu">
        <button mat-menu-item (click)="changeTheme('auto')">System</button>
        <button mat-menu-item (click)="changeTheme('light')">Light</button>
        <button mat-menu-item (click)="changeTheme('dark')">Dark</button>
      </mat-menu>

      <!-- Profile Button -->
      <button mat-icon-button [matMenuTriggerFor]="profileMenu">
        <mat-icon>account_circle</mat-icon>
      </button>
      <mat-menu #profileMenu="matMenu">
        <button mat-menu-item>
          <mat-icon>edit</mat-icon>
          <span>Edit Profile</span>
        </button>
        <button mat-menu-item>
          <mat-icon>settings</mat-icon>
          <span>Account Settings</span>
        </button>
        <mat-divider></mat-divider>
        <button mat-menu-item>
          <mat-icon>exit_to_app</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [],
})
export class AppToolbarComponent {
  themeManager = inject(ThemeManager);
  private appConfig = inject(APP_CONFIG_TOKEN);
  appName = this.appConfig.name;
  appShortName = this.appConfig.shortName;

  isDark$ = this.themeManager.isDark$;

  changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }
  horizontalNavItems = input.required<NavItem[]>();

}
