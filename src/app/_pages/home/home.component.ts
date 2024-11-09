import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { MaterialModules } from '../../..';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AlertComponent } from "../../shared/components/alert/alert.component";
import { ContainersComponent } from "../../../@breaker/components/containers/containers.component";

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussels sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ...MaterialModules, AlertComponent, ContainersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  ];

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  treeDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private _bottomSheet: MatBottomSheet
  ) {
    this.treeDataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '250px',
      data: { name: 'John Doe', animal: 'Dog' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openSnackBar() {
    this.snackBar.open('This is a snackbar message', 'Close', {
      duration: 3000,
    });
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
}

@Component({
  selector: 'app-dialog-content',
  standalone: true,
  imports: [CommonModule, ...MaterialModules],
  template: `
    <h2 mat-dialog-title>Dialog Title</h2>
    <mat-dialog-content>
      <p>This is a sample dialog content.</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `
})
export class DialogContentComponent {}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  standalone: true,
  imports: [CommonModule, ...MaterialModules],
  template: `
    <mat-nav-list>
      <a href="https://keep.google.com/" mat-list-item (click)="openLink($event)">
        <span mat-line>Google Keep</span>
        <span mat-line>Add to a note</span>
      </a>
    </mat-nav-list>
  `,
})
export class BottomSheetOverviewExampleSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
