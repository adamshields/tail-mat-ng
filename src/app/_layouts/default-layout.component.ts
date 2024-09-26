import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ThemeManager } from '../theme-manager.service';
import { ColorPickerComponent } from "../shared/components/color-picker/color-picker.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AlertComponent } from "../shared/components/alert/alert.component";


@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    AsyncPipe,
    ColorPickerComponent,
    MatFormFieldModule,
    MatInputModule,
    AlertComponent
],
  template: `

<!-- <div>
  <h1>Angular Material 3 Theming System: Complete Guide</h1>

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
  <app-color-picker class="color-picker"></app-color-picker>
  <mat-menu #themeMenu="matMenu">
    <button mat-menu-item (click)="changeTheme('auto')">System</button>
    <button mat-menu-item (click)="changeTheme('light')">Light</button>
    <button mat-menu-item (click)="changeTheme('dark')">Dark</button>
  </mat-menu>
  <div class="demo-buttons">
    <button mat-button>Basic</button>
    <button mat-raised-button>Raised</button>
    <button mat-stroked-button>Stroked</button>
    <button mat-flat-button>Flat</button>
  </div>
  <div class="demo-buttons density-xs">
    <h3>Density scale: -2, applied through class <code>.density-xs</code></h3>
    <button mat-button>Basic</button>
    <button mat-raised-button>Raised</button>
    <button mat-stroked-button>Stroked</button>
    <button mat-flat-button>Flat</button>
  </div>
  <div>
    <h3>Changing typesclae values</h3>
    <mat-form-field>
      <mat-label>Flat Button Font Size</mat-label>
      <input
        type="number"
        matInput
        [defaultValue]="14"
        (change)="changeFlatButtonFontSize($event)"
      />
    </mat-form-field>
    <mat-form-field>
      <mat-label>Heading Font Size</mat-label>
      <input
        type="number"
        matInput
        [defaultValue]="'56.992'"
        (change)="changeHeadingFontSize($event)"
      />
    </mat-form-field>
  </div>

  <div>
    <h3>Applying Angular Material theme to custom components</h3>
    <app-alert></app-alert>
  </div>

  <div class="demo-buttons custom-theme">
    <h3>Custom theme: Rose Red</h3>
    <button mat-button>Basic</button>
    <button mat-raised-button>Raised</button>
    <button mat-stroked-button>Stroked</button>
    <button mat-flat-button>Flat</button>
  </div>

  <div class="demo-buttons">
    <h3>Custom shape</h3>
    <button mat-button class="button-rounded">Basic</button>
    <button mat-raised-button class="button-rounded">Raised</button>
    <button mat-stroked-button class="button-rounded">Stroked</button>
    <button mat-flat-button class="button-rounded">Flat</button>
  </div>

  <div class="demo-buttons overrides-example">
    <h3>Overrides Example</h3>
    <button mat-button class="button-rounded">Basic</button>
    <button mat-raised-button class="button-rounded">Raised</button>
    <button mat-stroked-button class="button-rounded">Stroked</button>
    <button mat-flat-button class="button-rounded">Flat</button>
  </div>
</div> -->

    <!-- <main class="density-4xs">
      <ng-content></ng-content>
    </main> -->
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .spacer {
      flex: 1 1 auto;
    }
    main {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }
    .active {
      background-color: rgba(0,0,0,0.2);
    }
    div {
      padding: 1rem;
      padding-right: 56px;
    }

    .theme-toggle {
      position: fixed;
      top: 1rem;
      right: 1rem;
    }

    .demo-buttons {
      button {
        margin-right: 8px;
      }
    }
  `]
})
export class DefaultLayoutComponent {

  themeManager = inject(ThemeManager);
  isDark$ = this.themeManager.isDark$;

  changeTheme(theme: string) {
    this.themeManager.changeTheme(theme);
  }

  changeFlatButtonFontSize(ev: Event) {
    const size = (ev.target as HTMLInputElement).value ?? '14';

    const targetElement = document.documentElement;
    targetElement.style.setProperty('--sys-label-large-size', size + 'px');
  }

  changeHeadingFontSize(ev: Event) {
    const size = (ev.target as HTMLInputElement).value ?? '56.992';

    const targetElement = document.documentElement;
    targetElement.style.setProperty('--sys-display-large-size', size + 'px');

    // setting the line-height relationally
    targetElement.style.setProperty('--sys-display-large-line-height', '1.25');

    // <h1> (and display-large) uses --sys-display-large, hence we also need to update that variable to see the changes
    targetElement.style.setProperty(
      '--sys-display-large',
      '400 var(--sys-display-large-size) / var(--sys-display-large-line-height) Roboto, sans-serif'
    );
  }
}
