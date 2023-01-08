import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NavService } from '../../nav.service';

@Component({
  selector: 'dsa-nav-dialog',
  templateUrl: './nav-dialog.component.html',
  styleUrls: ['./nav-dialog.component.scss']
})
export class NavDialogComponent implements OnInit {
  private window: Window | null;
  constructor(
    private dialogRef: MatDialogRef<NavDialogComponent>,
    private navService: NavService,
    private router: Router,
    @Inject(DOCUMENT) docref: Document
  ) { 
    this.window = docref.defaultView
  }

  ngOnInit(): void {
  }

  public closeDialog(): void{
    this.dialogRef.close()
  }

  public closeDialogToConsultationForm(): void{
    this.closeDialog();
    this.dialogRef.afterClosed().subscribe(() => {
      this.navService.scrollToConsultationAnim();
    })
  }

  public closeDialogToFreeSampleForm(): void{
    this.closeDialog();
    this.dialogRef.afterClosed().subscribe(() => {
      this.navService.scrollToFreeSampleAnim();
    })
  }
 
}
