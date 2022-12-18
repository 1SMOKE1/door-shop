import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NavService } from '../../nav.service';

@Component({
  selector: 'dsa-nav-dialog',
  templateUrl: './nav-dialog.component.html',
  styleUrls: ['./nav-dialog.component.scss']
})
export class NavDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<NavDialogComponent>,
    private navService: NavService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public closeDialog(): void{
    this.dialogRef.close()
  }

  public closeDialogToConsultationForm(): void{
    this.closeDialog();
    this.dialogRef.afterClosed().subscribe(() => {
      this.navService.animationScrollToConsultationMobile();
    })
  }
 
}
