import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { carouselImageI } from 'src/app/interfaces/carouselImageI';
import { DataBaseService } from 'src/app/share/data-base.service';
import { OurCommentsDialogComponent } from './our-comments-dialog/our-comments-dialog.component';
import { OurWorksDialogComponent } from './our-works-dialog/our-works-dialog.component';


@Component({
  selector: 'dsa-our-works',
  templateUrl: './our-works.component.html',
  styleUrls: ['./our-works.component.scss']
})
export class OurWorksComponent implements OnInit{
  ourWorks: carouselImageI[] = [];
  ourComments: carouselImageI[] = [];
  text: string = '';
  constructor(
    private dialog: MatDialog,
    private dataBaseService: DataBaseService,
  ) {}



  ngOnInit(): void {
    this.getWorks();
    this.getComments();
    
  }

  public openDialogWorks(): void{
    const dialogRef = this.dialog.open(OurWorksDialogComponent);
    dialogRef.afterClosed().subscribe(() => this.getWorks());
  }

  public openDialogComments(): void{
    const dialogRef = this.dialog.open(OurCommentsDialogComponent);
    
    dialogRef.afterClosed().subscribe(() => this.getComments());
  }

  updateWorks(image: carouselImageI): void{
    const dialogRef = this.dialog.open(OurWorksDialogComponent, {
      data: image
    });
    dialogRef.afterClosed().subscribe(() => this.getWorks());
  }
  
  updateComments(image: carouselImageI): void{
    const dialogRef = this.dialog.open(OurCommentsDialogComponent, {
      data: image
    });
    dialogRef.afterClosed().subscribe(() => this.getComments());
  }

  deleteWorks(id: string): void{
    this.dataBaseService
      .deleteOurWorks(id)
      .subscribe(() => this.getWorks())
  }

  deleteComments(id: string): void{
    this.dataBaseService
      .deleteOurComments(id)
      .subscribe(() => this.getComments())
  }

  private getComments(): void{
    this.dataBaseService
      .getOurComments()
      .subscribe((res: carouselImageI[]) => this.ourComments = res);
  }

  private getWorks(): void{
    this.dataBaseService
    .getOurWorks()
    .subscribe((res: carouselImageI[]) => this.ourWorks = res);
  }
}
