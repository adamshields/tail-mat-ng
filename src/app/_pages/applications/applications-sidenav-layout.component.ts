import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applications-sidenav-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSidenavModule, MatListModule],
  template: `
    <mat-sidenav-container>
      <mat-sidenav mode="side" opened>
        <mat-nav-list>
          <a mat-list-item routerLink="/applications/designs">Designs</a>
          <!-- Add more sidenav items as needed -->
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    mat-sidenav-container {
      height: calc(100vh - 64px); /* Adjust based on your toolbar height */
    }
    mat-sidenav {
      width: 200px;
    }
  `]
})
export class ApplicationsSidenavLayoutComponent { }
