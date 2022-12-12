import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DataBaseService } from 'src/app/share/data-base.service';
import { productProducerI } from 'src/app/interfaces/productProducer';
import { furnituraI } from 'src/app/interfaces/furnitura';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductProducerComponent } from '../../product-producer/product-producer.component';
import { map } from 'rxjs';
import { FurnituraModel } from 'src/app/models/furnitura.model';

@Component({
  selector: 'dsa-furnitura',
  templateUrl: './furnitura.component.html',
  styleUrls: ['./furnitura.component.scss']
})
export class FurnituraComponent implements OnInit {

  @ViewChild('inputFileRef', {static: true}) public inputFile!: ElementRef;
  productProducers: productProducerI[] = [];
  furnituraForm: FormGroup = new FormGroup({
    'typeOfProduct': new FormControl('Фурнітура'), 
    'brand': new FormControl('', Validators.required), 
    'name': new FormControl('', Validators.required),  
    'price': new FormControl(0, Validators.required),
    'installationPrice': new FormControl(0, Validators.required), 
    'state': new FormControl('', Validators.required),
    'inStock': new FormControl('', Validators.required), 
    'country': new FormControl('', Validators.required), 
    'guarantee': new FormControl('', Validators.required), 
    'homePage': new FormControl(''), 
    'description': new FormControl(''),
  })
  public image: File | null = null;
  public imagePreview: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public furnitura: furnituraI,
    private dialog: MatDialog,
    private dataBaseService: DataBaseService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if(this.isEditMode()){
      this.furnituraForm.patchValue(this.furnitura);
      
      this.imagePreview = this.furnitura.imageSrc;
    }
    this.getProductProducers();
  }

  public isEditMode(): boolean{
    return !!this.furnitura;
  }

  public openProductProducerDialog(): void{
    const dialog = this.dialog.open(ProductProducerComponent);
    dialog.afterClosed().subscribe(() => this.getProductProducers())
  }

  public getProductProducers(): void{
    this.dataBaseService
      .getProductProducers()
      .pipe(
        map((prods: productProducerI[]) => prods.filter((el: productProducerI) => el.filtrationField === 'Фурнітура'))
        )
      .subscribe((prodsProducers: productProducerI[]) => this.productProducers =  prodsProducers)
  }

  public slashStylingOfFormField(fieldName: string): string{
    if(this.furnituraForm.get(fieldName)?.value === '' 
    || this.furnituraForm.get(fieldName)?.value === null){
      return ''
    }
      return this.furnituraForm.get(fieldName)?.value.join('/')
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

      const prod = new FurnituraModel(
        this.furnituraForm.value.typeOfProduct,
        this.furnituraForm.value.brand,
        this.furnituraForm.value.name,
        this.furnituraForm.value.country,
        this.furnituraForm.value.guarantee,
        this.furnituraForm.value.state,
        this.furnituraForm.value.price,
        this.furnituraForm.value.installationPrice,
        this.furnituraForm.value.inStock,
        this.furnituraForm.value.description,
        this.furnitura._id,
        this.furnitura.imageSrc,
        this.furnituraForm.value.homePage
      )
      this.dataBaseService
        .updateFurnitura(prod, this.image)
        .subscribe(() => {
          this.snackbar.open('Продукт було успішно відредаговано', 'X', {
            duration: 2000
          });
        })
    } else {
      this.dataBaseService
      .createFurnitura(this.furnituraForm.value, this.image)
      .subscribe(() => {
        this.furnituraForm.reset();
        this.snackbar.open('Продукт було успішно створено', 'X', {
          duration: 2000
        });
      })
    }
  }



}
