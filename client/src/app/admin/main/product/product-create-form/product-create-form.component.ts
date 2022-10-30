import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductI } from 'src/app/interfaces/product';
import { productProducerI } from 'src/app/interfaces/productProducer';
import { ProductModel } from 'src/app/models/product.model';

import { DataBaseService } from 'src/app/share/data-base.service';
import { ProductProducerComponent } from '../../product-producer/product-producer.component';

@Component({
  selector: 'dsa-product-create-form',
  templateUrl: './product-create-form.component.html',
  styleUrls: ['./product-create-form.component.scss']
})
export class ProductCreateFormComponent implements OnInit {
  @ViewChild('inputFileRef', {static: true}) public inputFile!: ElementRef;
  productForm: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'price': new FormControl('', Validators.required),
    'installationPrice': new FormControl('', Validators.required),
    'brand': new FormControl('', Validators.required),
    'country': new FormControl('', Validators.required),
    'guarantee_time': new FormControl({value: '12 місяців', disabled: true}),
    'state': new FormControl('', Validators.required),
    'in_stock': new FormControl('', Validators.required),
    'type_of_product': new FormControl('', Validators.required),
    'count_of_sealing_conturs': new FormControl(0),
    'door_leaf_material': new FormControl(''),
    'door_frame_material': new FormControl(''),
    'door_fill': new FormControl(''),
    'door_purpose': new FormControl(''),
    'door_application': new FormControl(''),
    'door_opening_method': new FormControl(''),
    'door_type': new FormControl(''),
    'door_opening_type': new FormControl(''),
    'door_area_material': new FormControl(''),
    'sail': new FormControl(''),
    'home_page': new FormControl(''),
    'description': new FormControl(''),
  })
  kindOfProduct: boolean = false;
  doorAreaCond: boolean = false;
  productProducers: productProducerI[] = [];
  public image: File | null = null;
  public imagePreview: string = '';
  constructor(
    private dataBaseService: DataBaseService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public product: ProductI,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if(this.isEditMode()){
      this.productForm.patchValue(this.product);

      this.imagePreview = this.product.imageSrc;
      this.changeDoorAreaCond();
      if(this.product.type_of_product === 'Фурнітура'){
        this.kindOfProduct = true;
      }
    }
    this.getProductProducers();
  }

  submit(): void{
    if(this.isEditMode()){
      const product = new ProductModel(
        this.productForm.value.name,
        this.product._id,
        this.productForm.value.price,
        this.product.imageSrc,
        this.productForm.value.installationPrice,
        this.productForm.value.brand,
        this.productForm.value.country,
        this.productForm.value.guarantee_time,
        this.productForm.value.state,
        this.productForm.value.in_stock,
        this.productForm.value.type_of_product,
        this.productForm.value.count_of_sealing_conturs,
        this.productForm.value.door_leaf_material,
        this.productForm.value.door_frame_material,
        this.productForm.value.door_purpose,
        this.productForm.value.door_fill,
        this.productForm.value.door_application,
        this.productForm.value.door_opening_method,
        this.productForm.value.door_type,
        this.productForm.value.door_opening_type,
        this.productForm.value.door_area_material,
        this.productForm.value.sail,
        this.productForm.value.home_page,
        this.productForm.value.description
      )

      this.dataBaseService
        .updateProduct(product, this.image)
        .subscribe(() => {

          this.snackBar.open(this.productForm.value.name + ' було відреаговано успішно!', 'X', {
          duration: 2000
          })


        })
    } else {
        this.dataBaseService
        .createProduct(this.productForm.value, this.image)
        .subscribe((door: ProductI) => {
          
          this.snackBar.open(this.productForm.value.name + ' був створений успішно!', 'X', {
          duration: 2000
          })

          this.productForm.reset();
    })  
    }
    
  }

 

  public changeProduct(): void{
    this.kindOfProduct = !this.kindOfProduct;
  }

  public isEditMode(): boolean{
    return !!this.product;
  }

  public openProductProducerDialog(): void{
    const dialog = this.dialog.open(ProductProducerComponent);
    dialog.afterClosed().subscribe(() => this.getProductProducers())
  }

  public getProductProducers(): void{
    this.dataBaseService
      .getProductProducers()
      .subscribe((res: productProducerI[]) => this.productProducers = res)
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

  public changeDoorAreaCond(): void{
    this.doorAreaCond = this.productForm.get('type_of_product')?.value === 'Двері міжкімнатні'
      ? true
      : false;
  }
}
