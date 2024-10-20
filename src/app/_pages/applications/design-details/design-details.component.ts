import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Design, DataService } from '../../../shared/data/data.serivce';

@Component({
  selector: 'app-design-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule],
  template: `
    <mat-card *ngIf="design">
      <mat-card-header>
        <mat-card-title>{{ design.name }}</mat-card-title>
        <mat-card-subtitle>Version: {{ design.version }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>{{ design.description }}</p>

        <h3>Servers</h3>
        <mat-list>
          <mat-list-item *ngFor="let server of design.servers">
            <mat-icon matListItemIcon>computer</mat-icon>
            <div matListItemTitle>{{ server.name }}</div>
            <div matListItemLine>IP: {{ server.ip }}</div>
            <div matListItemLine>Status: {{ server.status }}</div>
          </mat-list-item>
        </mat-list>

        <h3>Containers</h3>
        <mat-list>
          <mat-list-item *ngFor="let container of design.containers">
            <mat-icon matListItemIcon>developer_board</mat-icon>
            <div matListItemTitle>{{ container.name }}</div>
            <div matListItemLine>Image: {{ container.image }}</div>
            <div matListItemLine>Status: {{ container.status }}</div>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    // mat-card {
    //   max-width: 800px;
    //   margin: 20px auto;
    // }
    // h3 {
    //   margin-top: 20px;
    // }
  `]
})
export class DesignDetailsComponent implements OnInit, OnDestroy {
  design: Design | null = null;
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.route.paramMap.pipe(
        switchMap(params => {
          const appId = Number(params.get('id'));
          const designId = Number(params.get('designId'));
          return this.dataService.getDesign(appId, designId);
        })
      ).subscribe(design => {
        this.design = design || null;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
