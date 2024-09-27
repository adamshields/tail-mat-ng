import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Application, DataService } from '../../shared/data/data.serivce';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    RouterModule
  ],
  template: `
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      <!-- Application Name Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Name </th>
        <td mat-cell *matCellDef="let app"> {{app.name}} </td>
      </ng-container>

      <!-- Description Column -->
      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef> Description </th>
        <td mat-cell *matCellDef="let app"> {{app.description}} </td>
      </ng-container>

      <!-- Portfolio Column -->
      <ng-container matColumnDef="portfolio">
        <th mat-header-cell *matHeaderCellDef> Portfolio </th>
        <td mat-cell *matCellDef="let app"> {{app.portfolio}} </td>
      </ng-container>

      <!-- Actions Column -->
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef> Actions </th>
        <td mat-cell *matCellDef="let app">
          <button mat-raised-button color="primary" [routerLink]="['/applications', app.id]">
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
export class ApplicationsComponent implements OnInit {
  applications$: Observable<Application[]>;
  dataSource: MatTableDataSource<Application>;
  displayedColumns: string[] = ['name', 'description', 'portfolio', 'actions'];

  constructor(private dataService: DataService) {
    this.applications$ = this.dataService.getPortfolios().pipe(
      map(portfolios => portfolios.flatMap(portfolio =>
        portfolio.applications.map(app => ({
          ...app,
          portfolio: portfolio.name
        }))
      ))
    );
    this.dataSource = new MatTableDataSource<Application>([]);
  }

  ngOnInit() {
    this.applications$.subscribe(applications => {
      this.dataSource.data = applications;
    });
  }
}
