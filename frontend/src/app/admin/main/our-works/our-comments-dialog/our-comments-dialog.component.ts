import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { carouselImageI } from 'src/app/interfaces/carouselImageI';
import { DataBaseService } from 'src/app/share/data-base.service';

@Component({
  selector: 'dsa-our-comments-dialog',
  templateUrl: './our-comments-dialog.component.html',
  styleUrls: ['./our-comments-dialog.component.scss']
})
export class OurCommentsDialogComponent implements OnInit {
  @ViewChild('inputFileRef', {static: true}) public inputFile!: ElementRef;
  public image: File | null = null;
  public imagePreview: string = '';
  
  constructor(
    private dataBaseService: DataBaseService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public ourCommentImage: carouselImageI
    ) { }

  ngOnInit(): void {
    if(this.isEditMode()){
      this.imagePreview = this.ourCommentImage.imageSrc;
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
      if(this.ourCommentImage._id)
      this.dataBaseService 
      .updateOurComments(this.ourCommentImage._id ,this.image)
      .subscribe(() => {
        this.snackBar.open('Зображення було змінено успішно', 'X', {
          duration: 2000
        })
      })
    }
    this.dataBaseService 
      .createOurComments(this.image)
      .subscribe(() => {
        this.snackBar.open('Зображення було додано успішно', 'X', {
          duration: 2000
        })
      })
  }

  isEditMode(): boolean{
    return !!this.ourCommentImage;
  }
}
