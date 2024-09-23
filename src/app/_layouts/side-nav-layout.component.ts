import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidenav-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>MyApp</span>
      <a mat-button routerLink="/" routerLinkActive="active">Home</a>
      <a mat-button routerLink="/applications" routerLinkActive="active">Applications</a>
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
    <mat-sidenav-container>
      <mat-sidenav mode="side" opened>
        <mat-nav-list>
          <a mat-list-item routerLink="/applications/designs" routerLinkActive="active">Designs</a>
          <a mat-list-item routerLink="/applications/mockups" routerLinkActive="active">Mockups</a>
          <a mat-list-item routerLink="/applications/prototypes" routerLinkActive="active">Prototypes</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <main>
          <ng-content></ng-content>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
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
    mat-sidenav-container {
      flex: 1;
    }
    mat-sidenav {
      width: 200px;
    }
    main {
      padding: 20px;
    }
    .active {
      background-color: rgba(0,0,0,0.1);
    }
  `]
})
export class SidenavLayoutComponent {}
