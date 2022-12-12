import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NavDialogComponent } from './nav-dialog/nav-dialog.component';

@Component({
  selector: 'dsa-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Output() emitScrollAction: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() emitScrollAction2: EventEmitter<Event> = new EventEmitter<Event>();
  private window: Window | null;
  constructor(
    private dialog: MatDialog,
    @Inject(DOCUMENT) docRef: Document,
    private router: Router,

  ) {
    this.window = docRef.defaultView;
   }

  ngOnInit(): void {
    
  }
  
  
  openNavDialog(): void{
    const dialogRef =  this.dialog.open(NavDialogComponent);
    this.window?.addEventListener('resize', () => {
      if(this.window!.innerWidth > 1000){
        dialogRef.close()
      }
    })
  }

  emitScroll(): void{
    this.emitScrollAction.emit()
  }

  emitScroll2(): void{
    this.emitScrollAction2.emit();
  }
}
