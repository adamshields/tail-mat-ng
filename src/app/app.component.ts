import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgSwitch, NgSwitchCase } from '@angular/common';
import { DefaultLayoutComponent } from './_layouts/default-layout.component';

import { LayoutService } from '../layout.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NgSwitch, NgSwitchCase, DefaultLayoutComponent, ],
  template: `
  <router-outlet/>

    <!-- <ng-container [ngSwitch]="layoutService.currentLayout$ | async">
      <app-default-layout *ngSwitchCase="'default'">
        <router-outlet></router-outlet>
      </app-default-layout>
      <app-sidenav-layout *ngSwitchCase="'sidenav'">
        <router-outlet></router-outlet>
      </app-sidenav-layout>
    </ng-container> -->
  `
})
export class AppComponent {
  // constructor(public layoutService: LayoutService) {}
}
