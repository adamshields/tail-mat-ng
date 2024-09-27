import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataService, Design } from '../../../shared/data/data.serivce';

@Component({
  selector: 'app-application-details',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule
  ],
  template: `
    <h2>Application Designs</h2>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      <!-- Design Name Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let design"> {{design.name}} </td>
      </ng-container>

      <!-- Version Column -->
      <ng-container matColumnDef="version">
        <th mat-header-cell *matHeaderCellDef> Version </th>
        <td mat-cell *matCellDef="let design"> {{design.version}} </td>
      </ng-container>

      <!-- Description Column -->
      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef> Description </th>
        <td mat-cell *matCellDef="let design"> {{design.description}} </td>
      </ng-container>

      <!-- Actions Column -->
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef> Actions </th>
        <td mat-cell *matCellDef="let design">
        <button mat-raised-button color="primary" [routerLink]="['designs', design.id]">
          View Details
        </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: [`
    table {
      width: 100%;
    }
    .mat-column-actions {
      width: 120px;
      text-align: center;
    }
  `]
})
export class ApplicationDetailsComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Design> = new MatTableDataSource<Design>([]);
  displayedColumns: string[] = ['name', 'version', 'description', 'actions'];
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
          return this.dataService.getApplication(appId);
        })
      ).subscribe(application => {
        if (application) {
          this.dataSource.data = application.designs;
        } else {
          this.dataSource.data = [];
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
