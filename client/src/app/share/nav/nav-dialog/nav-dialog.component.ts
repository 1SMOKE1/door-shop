import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dsa-nav-dialog',
  templateUrl: './nav-dialog.component.html',
  styleUrls: ['./nav-dialog.component.scss']
})
export class NavDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<NavDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void{
    this.dialogRef.close()
  }
}
