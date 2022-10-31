import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductI } from 'src/app/interfaces/product';
import { DataBaseService } from 'src/app/share/data-base.service';
import { ProductCreateFormComponent } from '../product/product-create-form/product-create-form.component';

@Component({
  selector: 'dsa-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: ProductI[] = [];
  constructor(
    private dataBaseService: DataBaseService,
    private dialog: MatDialog
  ) { }
  selectedCard: ProductI | null = null;
  counter: number = 1;
  ngOnInit(): void {
    this.getProducts()

  }

  private getProducts(): void{
    this.dataBaseService
    .getProducts()
    .subscribe((products: ProductI[]) => this.products = products)
  }

  createCard(): void{
    const dialogRef = this.dialog.open(ProductCreateFormComponent);


    dialogRef.afterClosed()
    .subscribe(() => this.getProducts())
  }

  updateCard(product: ProductI): void{
    const dialogRef = this.dialog.open(ProductCreateFormComponent,{
      data: product
    });
    dialogRef.afterClosed()
    .subscribe(() => this.getProducts())
  }

  getSelected(product: ProductI): void{
    this.counter++
    if(this.counter % 2 === 0){
      this.selectedCard = product;
    } else {
      this.selectedCard = null;
    }
    if(this.counter > 2){
      this.counter = 0;
    }
  }

  public deleteCard(id: string): void{
    this.dataBaseService
      .deleteProduct(id)
      .subscribe(() => this.getProducts())
  }

}
