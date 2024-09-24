import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

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
    MatMenuModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>MyApp</span>
      <a mat-button routerLink="/" routerLinkActive="active">Home</a>
      <a mat-button routerLink="/applications" routerLinkActive="active">Applications</a>
      <a mat-button routerLink="/color" routerLinkActive="active">Color</a>
      <span class="spacer"></span>
      <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="User menu">
        <mat-icon>account_circle</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item>
          <mat-icon>person</mat-icon>
          <span>Profile</span>
        </button>
        <button mat-menu-item>
          <mat-icon>exit_to_app</mat-icon>
          <span>Logout</span>
        </button>
      </mat-menu>
    </mat-toolbar>
    <main>
      <ng-content></ng-content>
    </main>
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
  `]
})
export class DefaultLayoutComponent {}
