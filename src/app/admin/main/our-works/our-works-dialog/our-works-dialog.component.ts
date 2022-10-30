import { Component, OnInit, ViewChild, ElementRef, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { carouselImageI } from 'src/app/interfaces/carouselImageI';
import { DataBaseService } from 'src/app/share/data-base.service';


@Component({
  selector: 'dsa-our-works-dialog',
  templateUrl: './our-works-dialog.component.html',
  styleUrls: ['./our-works-dialog.component.scss']
})
export class OurWorksDialogComponent implements OnInit {
  @ViewChild('inputFileRef', {static: true}) public inputFile!: ElementRef;
  public image: File | null = null;
  public imagePreview: string = '';
  constructor(
    private dataBaseService: DataBaseService,
    @Inject(MAT_DIALOG_DATA) public ourWorkImage: carouselImageI,
    private snackBar: MatSnackBar,
    
  ) { }

  ngOnInit(): void {
    
    if(this.isEditMode()){
      this.imagePreview = this.ourWorkImage.imageSrc;
    }
  }

  public triggerInput(): void{
    this.inputFile.nativeElement.click();
  }

  public onFileUpload(e: Event): void{
    let cur = e.target as any;

    const file = cur.files[0];


    this.image = file;
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }

    reader.readAsDataURL(file);
  }

  create(): void{
   
    if(this.isEditMode()){
      if(this.ourWorkImage._id)
      this.dataBaseService 
      .updateOurWorks(this.ourWorkImage._id ,this.image)
      .subscribe(() => {
        this.snackBar.open('Зображення було змінено успішно', 'X', {
          duration: 2000
        })
        
      })
    }
    this.dataBaseService 
      .createOurWorks(this.image)
      .subscribe(() => {
        this.snackBar.open('Зображення було додано успішно', 'X', {
          duration: 2000
        })

        
      })
  }

  isEditMode(): boolean{
    return !!this.ourWorkImage;
  }

}
