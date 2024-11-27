import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { TableConfig } from '../../models/table-config.model';
import { TableToolbarComponent } from '../table-toolbar/table-toolbar.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [TableToolbarComponent, MatTableModule, MatPaginatorModule, MatSortModule, CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
  @Input() tableConfig!: TableConfig;

  dataSource!: MatTableDataSource<Record<string, any>>;
  displayedColumns: string[] = [];
  totalItems: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableConfig.data);

    // Include only visible columns
    this.displayedColumns = this.tableConfig.columns
      .filter((col) => col.visible !== false) // Exclude columns with visible: false
      .map((col) => col.key);

    // Add actions column if defined
    if (this.tableConfig.actions?.length) {
      this.displayedColumns.push('actions');
    }

    this.totalItems = this.tableConfig.data.length;
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applySearch(searchValue: string): void {
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  clearFilters(): void {
    this.dataSource.filter = '';
  }
}
