import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { interiorDoorI } from 'src/app/interfaces/interiorDoorI';
import { productProducerI } from 'src/app/interfaces/productProducer';
import { interiorDoorModel } from 'src/app/models/interiorDoor.model';
import { DataBaseService } from 'src/app/share/data-base.service';
import { ProductProducerComponent } from '../../product-producer/product-producer.component';

@Component({
  selector: 'dsa-interiror-doors',
  templateUrl: './interiror-doors.component.html',
  styleUrls: ['./interiror-doors.component.scss']
})
export class InterirorDoorsComponent implements OnInit {
  @ViewChild('inputFileRef', {static: true}) public inputFile!: ElementRef;
  productProducers: productProducerI[] = [];
  interiorDoorForm: FormGroup = new FormGroup({
    'typeOfProduct': new FormControl('Двері міжкімнатні'), 
    'brand': new FormControl('', Validators.required), 
    'name': new FormControl('', Validators.required),  
    'price': new FormControl(0, Validators.required),
    'installationPrice': new FormControl(0, Validators.required), 
    'inStock': new FormControl('', Validators.required), 
    'country': new FormControl('', Validators.required), 
    'guarantee': new FormControl('', Validators.required), 
    'homePage': new FormControl(''), 
    'state': new FormControl('', Validators.required), 
    'finishingTheSurface': new FormControl([], Validators.required), 
    'frameMaterial': new FormControl([], Validators.required), 
    'structuralFeatures': new FormControl([], Validators.required), 
    'openingType': new FormControl([], Validators.required), 
    'installationType': new FormControl([], Validators.required), 
    'openingMethod': new FormControl([], Validators.required),
    'description': new FormControl(''),
  })
  public image: File | null = null;
  public imagePreview: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public interiorDoor: interiorDoorI,
    private dialog: MatDialog,
    private dataBaseService: DataBaseService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if(this.isEditMode()){
      this.interiorDoorForm.patchValue(this.interiorDoor);
      
      this.imagePreview = this.interiorDoor.imageSrc;
    }
    this.getProductProducers();
  }

  public isEditMode(): boolean{
    return !!this.interiorDoor;
  }

  public openProductProducerDialog(): void{
    const dialog = this.dialog.open(ProductProducerComponent);
    dialog.afterClosed().subscribe(() => this.getProductProducers())
  }

  public getProductProducers(): void{
    this.dataBaseService
      .getProductProducers()
      .pipe(
        map((prods: productProducerI[]) => prods.filter((el: productProducerI) => el.filtrationField === 'Двері міжкімнатні'))
        )
      .subscribe((prodsProducers: productProducerI[]) => this.productProducers =  prodsProducers)
  }

  public slashStylingOfFormField(fieldName: string): string{
    if(this.isEditMode()){
      return ''
    } else {
      if(this.interiorDoorForm.get(fieldName)?.value === '' 
      || this.interiorDoorForm.get(fieldName)?.value === null){
        return ''
      }
        return this.interiorDoorForm.get(fieldName)?.value.join('/')
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

  public submit(): void{
    if(this.isEditMode()){

      const prod = new interiorDoorModel(
        this.interiorDoorForm.value.typeOfProduct,
        this.interiorDoorForm.value.brand,
        this.interiorDoorForm.value.name,
        this.interiorDoorForm.value.country,
        this.interiorDoorForm.value.guarantee,
        this.interiorDoorForm.value.state,
        this.interiorDoorForm.value.price,
        this.interiorDoorForm.value.installationPrice,
        this.interiorDoorForm.value.inStock,
        this.interiorDoorForm.value.description,
        this.interiorDoor._id,
        this.interiorDoorForm.value.finishingTheSurface,
        this.interiorDoorForm.value.frameMaterial,
        this.interiorDoorForm.value.structuralFeatures,
        this.interiorDoorForm.value.openingType,
        this.interiorDoorForm.value.installationType,
        this.interiorDoorForm.value.openingMethod,
        this.interiorDoor.imageSrc,
        this.interiorDoorForm.value.homePage
      )
      this.dataBaseService
        .updateInteriorDoor(prod, this.image)
        .subscribe(() => {
          this.snackbar.open('Продукт було успішно відредаговано', 'X', {
            duration: 2000
          });
        })
    } else {
      this.dataBaseService
      .createInteriorDoor(this.interiorDoorForm.value, this.image)
      .subscribe(() => {
        this.interiorDoorForm.reset();
        this.snackbar.open('Продукт було успішно створено', 'X', {
          duration: 2000
        });
      })
    }
  }


}
