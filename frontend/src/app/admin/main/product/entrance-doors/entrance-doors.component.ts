import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { productProducerI } from 'src/app/interfaces/productProducer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { entranceDoorI } from 'src/app/interfaces/entranceDoor';
import { DataBaseService } from 'src/app/share/data-base.service';
import { ProductProducerComponent } from '../../product-producer/product-producer.component';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { entranceDoorModel } from 'src/app/models/entranceDoor.model';


@Component({
  selector: 'dsa-entrance-doors',
  templateUrl: './entrance-doors.component.html',
  styleUrls: ['./entrance-doors.component.scss']
})
export class EntranceDoorsComponent implements OnInit {
  @ViewChild('inputFileRef', {static: true}) public inputFile!: ElementRef;
  productProducers: productProducerI[] = [];
  entranceDoorForm: FormGroup = new FormGroup({
    'typeOfProduct': new FormControl('Двері вхідні'), // +
    'brand': new FormControl('', Validators.required), // +
    'name': new FormControl('', Validators.required), // + 
    'price': new FormControl(0, Validators.required),// +
    'installationPrice': new FormControl(0, Validators.required), // +
    'inStock': new FormControl('', Validators.required), // +
    'country': new FormControl('', Validators.required), // +
    'guarantee': new FormControl('', Validators.required), // +
    'homePage': new FormControl(''), // +
    'state': new FormControl('', Validators.required), // +
    'amountOfSealingMaterials': new FormControl([], Validators.required), //+
    'fabricMaterial': new FormControl([], Validators.required), //+
    'purpose': new FormControl([], Validators.required), //+
    'openingMethod': new FormControl([], Validators.required), //+
    'covering': new FormControl([], Validators.required), //+
    'frameMaterial': new FormControl([], Validators.required),
    'description': new FormControl(''),
  })
  public image: File | null = null;
  public imagePreview: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public entranceDoor: entranceDoorI,
    private dialog: MatDialog,
    private dataBaseService: DataBaseService,
    private snackbar: MatSnackBar
    
  ) { }

  ngOnInit(): void {
    if(this.isEditMode()){
      this.entranceDoorForm.patchValue(this.entranceDoor);
      this.imagePreview = this.entranceDoor.imageSrc;
    }
    this.getProductProducers();
  }

  public isEditMode(): boolean{
    return !!this.entranceDoor;
  }

  public openProductProducerDialog(): void{
    const dialog = this.dialog.open(ProductProducerComponent);
    dialog.afterClosed().subscribe(() => this.getProductProducers())
  }

  public getProductProducers(): void{
    this.dataBaseService
      .getProductProducers()
      .pipe(
        map((prods: productProducerI[]) => prods.filter((el: productProducerI) => el.filtrationField === 'Двері вхідні'))
        )
      .subscribe((prodsProducers: productProducerI[]) => this.productProducers =  prodsProducers)
  }

  public slashStylingOfFormField(fieldName: string): string | []{
    console.log(this.entranceDoorForm.get(fieldName)?.value)
    if(this.isEditMode()){
      if(fieldName === 'amountOfSealingMaterials'){
        return []
      } 
      return ''
    } else {
      
      if(this.entranceDoorForm.get(fieldName)?.value === ''
      || this.entranceDoorForm.get(fieldName)?.value === null){
      return ''
    } 
      return this.entranceDoorForm.get(fieldName)?.value.join('/')
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
      const prod = new entranceDoorModel(
        this.entranceDoorForm.value.typeOfProduct,
        this.entranceDoorForm.value.brand,
        this.entranceDoorForm.value.name,
        this.entranceDoorForm.value.country,
        this.entranceDoorForm.value.guarantee,
        this.entranceDoorForm.value.state,
        this.entranceDoorForm.value.price,
        this.entranceDoorForm.value.installationPrice,
        this.entranceDoorForm.value.inStock,
        this.entranceDoorForm.value.description,
        this.entranceDoor._id,
        this.entranceDoorForm.value.amountOfSealingMaterials,
        this.entranceDoorForm.value.fabricMaterial,
        this.entranceDoorForm.value.purpose,
        this.entranceDoorForm.value.openingMethod,
        this.entranceDoorForm.value.covering,
        this.entranceDoorForm.value.frameMaterial,
        this.entranceDoor.imageSrc,
        this.entranceDoorForm.value.homePage
      )

      this.dataBaseService
        .updateEntranceDoor(prod, this.image)
        .subscribe((res: entranceDoorI) => {
          console.log(res);
          this.snackbar.open('Продукт було успішно редаговано', 'X', {
            duration: 2000
          });
        })
    } else {
      this.dataBaseService
      .createEntranceDoor(this.entranceDoorForm.value, this.image)
      .subscribe(() => {
        this.entranceDoorForm.reset();
        this.snackbar.open('Продукт було успішно створено', 'X', {
          duration: 2000
        });
      })
    }
  }

}
