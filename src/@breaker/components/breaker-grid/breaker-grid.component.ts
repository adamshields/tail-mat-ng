import { Component, Input, ContentChildren, QueryList, AfterContentInit, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { BreakerColumnDirective } from '../breaker-column.directive';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'breaker-grid',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatIconModule, MatTooltipModule, MatInputModule],
  templateUrl: './breaker-grid.component.html',
  styleUrls: ['./breaker-grid.component.scss'],
})
export class BreakerGridComponent implements OnInit, AfterContentInit {
  @Input() dataSource: any[] = [];
  @Input() allowPaging: boolean = true;
  @Input() allowSorting: boolean = true;
  @Input() allowFiltering: boolean = false;
  @Input() commands?: { icon: string; tooltip: string; callback: (row: any) => void }[] = [];

  @ContentChildren(BreakerColumnDirective) columns!: QueryList<BreakerColumnDirective>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  materialDataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  globalFilter: string = '';
  columnFilters: { [key: string]: string } = {};

  ngOnInit(): void {
    this.materialDataSource = new MatTableDataSource(this.dataSource);
    this.setupFilterPredicate();
  }

  ngAfterContentInit(): void {
    this.displayedColumns = this.columns.map(col => col.field);
    if (this.commands?.length) {
      this.displayedColumns.push('commands');
    }
  }

  ngAfterViewInit(): void {
    if (this.allowPaging) {
      this.materialDataSource.paginator = this.paginator;
    }
    if (this.allowSorting) {
      this.materialDataSource.sort = this.sort;
    }
  }

  applyGlobalFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.globalFilter = filterValue.trim().toLowerCase();
    this.materialDataSource.filter = filterValue;

    if (this.materialDataSource.paginator) {
      this.materialDataSource.paginator.firstPage();
    }
  }

  applyColumnFilter(event: Event, field: string): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.columnFilters[field] = filterValue.trim().toLowerCase();
    this.materialDataSource.filter = ' '; // Trigger filtering

    if (this.materialDataSource.paginator) {
      this.materialDataSource.paginator.firstPage();
    }
  }

  private setupFilterPredicate(): void {
    this.materialDataSource.filterPredicate = (data: any, filter: string) => {
      const globalFilterMatch = Object.values(data)
        .join(' ')
        .toLowerCase()
        .includes(this.globalFilter);

      const columnFilterMatch = Object.keys(this.columnFilters).every(key => {
        const columnValue = (data[key] || '').toString().toLowerCase();
        return columnValue.includes(this.columnFilters[key]);
      });

      return globalFilterMatch && columnFilterMatch;
    };
  }
}
