import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { entranceDoorI } from 'src/app/interfaces/entranceDoor';
import { interiorDoorI } from 'src/app/interfaces/interiorDoorI';
import { ProductI } from 'src/app/interfaces/product';
import { DataBaseService } from 'src/app/share/data-base.service';
import { EntranceDoorsComponent } from '../product/entrance-doors/entrance-doors.component';
import { InterirorDoorsComponent } from '../product/interiror-doors/interiror-doors.component';
import { ProductCreateFormComponent } from '../product/product-create-form/product-create-form.component';

@Component({
  selector: 'dsa-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: ProductI[] = [];
  interiorDoors: interiorDoorI[] = [];
  entranceDoors: entranceDoorI[] = [];
  constructor(
    private dataBaseService: DataBaseService,
    private dialog: MatDialog
  ) { }
  selectedCard: ProductI | null = null;
  counter: number = 1;
  ngOnInit(): void {
    this.getProducts()
    this.getInteriorDoor();
    this.getEntranceDoor();
  }

  private getInteriorDoor(): void{
    this.dataBaseService  
      .getInteriorDoor()
      .subscribe((prods: interiorDoorI[]) => {
        this.interiorDoors = prods;
        console.log(this.interiorDoors); 
      })
  }

  public createInteriorDoorCard(): void{
    const dialogRef = this.dialog.open(InterirorDoorsComponent)

    dialogRef.afterClosed()
    .subscribe(() => this.getInteriorDoor())
  }

  public updateInteriorDoorCard(interiorDoor: interiorDoorI): void{
    const dialogRef = this.dialog.open(InterirorDoorsComponent, {
      data: interiorDoor
    })

    dialogRef.afterClosed()
    .subscribe(() => this.getInteriorDoor())
  }

  public deleteInteriorDoorCard(id: string): void{
    this.dataBaseService
      .deleteInteriorDoor(id)
      .subscribe(() => this.getInteriorDoor());
  }



  private getEntranceDoor(): void{
    this.dataBaseService
      .getEntranceDoor()
      .subscribe((res: entranceDoorI[]) => {
        this.entranceDoors = res;
        console.log(this.entranceDoors);
      })
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

  getSelected(product: any): void{
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

  public createEntranceDoorCard(): void{
    const dialogRef = this.dialog.open(EntranceDoorsComponent)

    dialogRef.afterClosed()
    .subscribe(() => this.getEntranceDoor())
  }

  public updateEntranceDoorCard(entranceDoor: entranceDoorI): void{
    const dialogRef = this.dialog.open(EntranceDoorsComponent, {
      data: entranceDoor
    })

    dialogRef.afterClosed()
    .subscribe(() => this.getEntranceDoor())
  }

  public deleteEntranceDoorCard(id: string): void{
    this.dataBaseService
     .deleteEntranceDoor(id)
     .subscribe(() => this.getEntranceDoor())
  }


}
