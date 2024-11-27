import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableConfig } from '../../models/table-config.model';
import { TableToolbarComponent } from '../table-toolbar/table-toolbar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [TableToolbarComponent, MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit {
  @Input() tableConfig!: TableConfig;

  dataSource!: MatTableDataSource<Record<string, any>>;
  displayedColumns: string[] = [];
  totalItems: number = 0;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableConfig.data);
    this.displayedColumns = this.tableConfig.columns.map((col) => col.key);
    this.totalItems = this.tableConfig.data.length;
  }

  applySearch(searchValue: string): void {
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  clearFilters(): void {
    this.dataSource.filter = '';
  }
}
