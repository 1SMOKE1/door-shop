import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { productProducerI } from 'src/app/interfaces/productProducer';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DataBaseService } from 'src/app/share/data-base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { windowI } from 'src/app/interfaces/window';
import { ProductProducerComponent } from '../../product-producer/product-producer.component';
import { map } from 'rxjs';
import { windowModel } from 'src/app/models/window.model';


@Component({
  selector: 'dsa-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {
  @ViewChild('inputFileRef', {static: true}) public inputFile!: ElementRef;
  productProducers: productProducerI[] = [];
  windowForm: FormGroup = new FormGroup({
    'typeOfProduct': new FormControl('Вікна'), // +
    'brand': new FormControl('', Validators.required), // +
    'name': new FormControl('', Validators.required), // + 
    'price': new FormControl(0, Validators.required),// +
    'installationPrice': new FormControl(0, Validators.required), // +
    'inStock': new FormControl('', Validators.required), // +
    'country': new FormControl('', Validators.required), // +
    'guarantee': new FormControl('', Validators.required), // +
    'homePage': new FormControl(''), // +
    'state': new FormControl('', Validators.required), // +
    'profile': new FormControl([], Validators.required), //+
    'construction': new FormControl([], Validators.required), //+
    'glassUnit': new FormControl([], Validators.required), //+
    'lamination': new FormControl([], Validators.required), //+
    'glasses': new FormControl([], Validators.required), //+
    'description': new FormControl(''),
  })
  public image: File | null = null;
  public imagePreview: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public window: windowI,
    private dialog: MatDialog,
    private dataBaseService: DataBaseService,
    private snackbar: MatSnackBar
    
  ) { }

  ngOnInit(): void {
    if(this.isEditMode()){
      this.windowForm.patchValue(this.window);
      this.imagePreview = this.window.imageSrc;
    }
    this.getProductProducers();
  }

  public isEditMode(): boolean{
    return !!this.window;
  }

  public openProductProducerDialog(): void{
    const dialog = this.dialog.open(ProductProducerComponent);
    dialog.afterClosed().subscribe(() => this.getProductProducers())
  }

  public getProductProducers(): void{
    this.dataBaseService
      .getProductProducers()
      .pipe(
        map((prods: productProducerI[]) => prods.filter((el: productProducerI) => el.filtrationField === 'Вікна'))
        )
      .subscribe((prodsProducers: productProducerI[]) => this.productProducers =  prodsProducers)
  }

  public slashStylingOfFormField(fieldName: string): string | []{
      if(this.windowForm.get(fieldName)?.value === ''
      || this.windowForm.get(fieldName)?.value === null){
      return ''
    } 
      return this.windowForm.get(fieldName)?.value.join('/')
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

  public submit(): void{
    if(this.isEditMode()){
      const prod = new windowModel(
        this.windowForm.value.typeOfProduct,
        this.windowForm.value.brand,
        this.windowForm.value.name,
        this.windowForm.value.country,
        this.windowForm.value.guarantee,
        this.windowForm.value.state,
        this.windowForm.value.price,
        this.windowForm.value.installationPrice,
        this.windowForm.value.inStock,
        this.windowForm.value.description,
        this.window._id,
        this.windowForm.value.profile,
        this.windowForm.value.construction,
        this.windowForm.value.glassUnit,
        this.windowForm.value.lamination,
        this.windowForm.value.glasses,
        this.window.imageSrc,
        this.windowForm.value.homePage
      )

      this.dataBaseService
        .updateWindow(prod, this.image)
        .subscribe((res: windowI) => {
          console.log(res);
          this.snackbar.open('Продукт було успішно редаговано', 'X', {
            duration: 2000
          });
        })
    } else {
      this.dataBaseService
      .createWindow(this.windowForm.value, this.image)
      .subscribe(() => {
        this.windowForm.reset();
        this.snackbar.open('Продукт було успішно створено', 'X', {
          duration: 2000
        });
      })
    }
  }

}
