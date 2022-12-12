import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, merge, Observable, reduce } from 'rxjs';
import { entranceDoorI } from 'src/app/interfaces/entranceDoor';
import { furnituraI } from 'src/app/interfaces/furnitura';
import { interiorDoorI } from 'src/app/interfaces/interiorDoorI';
import { productMultiSingleType } from 'src/app/interfaces/multiType';
import { windowI } from 'src/app/interfaces/window';
import { DataBaseService } from 'src/app/share/data-base.service';
import { EntranceDoorsComponent } from '../product/entrance-doors/entrance-doors.component';
import { FurnituraComponent } from '../product/furnitura/furnitura.component';
import { InterirorDoorsComponent } from '../product/interiror-doors/interiror-doors.component';
import { WindowComponent } from '../product/window/window.component';

@Component({
  selector: 'dsa-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  interiorDoors: interiorDoorI[] = [];
  entranceDoors: entranceDoorI[] = [];
  windows: windowI[] = [];
  furnituras: furnituraI[] = [];
  products: productMultiSingleType[] = [];
  constructor(
    private dataBaseService: DataBaseService,
    private dialog: MatDialog
  ) { }
  selectedCard: productMultiSingleType | null = null;
  counter: number = 1;
  ngOnInit(): void {
    this.getInteriorDoors();
    this.getEntranceDoors();
    this.getWindows();
    this.getFurnituras();
    this.getProductsOnMainScreen();
  }

  private getInteriorDoors(): void{
    this.dataBaseService  
      .getInteriorDoors()
      .subscribe((prods: interiorDoorI[]) => this.interiorDoors = prods)
  }

  public createInteriorDoorCard(): void{
    const dialogRef = this.dialog.open(InterirorDoorsComponent)

    dialogRef.afterClosed()
    .subscribe(() => this.getInteriorDoors())
  }

  public updateInteriorDoorCard(interiorDoor: interiorDoorI): void{
    const dialogRef = this.dialog.open(InterirorDoorsComponent, {
      data: interiorDoor
    })

    dialogRef.afterClosed()
    .subscribe(() => this.getInteriorDoors())
  }

  public deleteInteriorDoorCard(id: string): void{
    this.dataBaseService
      .deleteInteriorDoor(id)
      .subscribe(() => this.getInteriorDoors());
  }



  private getEntranceDoors(): void{
    this.dataBaseService
      .getEntranceDoors()
      .subscribe((res: entranceDoorI[]) => {
        this.entranceDoors = res;
        console.log(this.entranceDoors);
      })
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

  public createEntranceDoorCard(): void{
    const dialogRef = this.dialog.open(EntranceDoorsComponent)

    dialogRef.afterClosed()
    .subscribe(() => this.getEntranceDoors())
  }

  public updateEntranceDoorCard(entranceDoor: entranceDoorI): void{
    const dialogRef = this.dialog.open(EntranceDoorsComponent, {
      data: entranceDoor
    })

    dialogRef.afterClosed()
    .subscribe(() => this.getEntranceDoors())
  }

  public deleteEntranceDoorCard(id: string): void{
    this.dataBaseService
     .deleteEntranceDoor(id)
     .subscribe(() => this.getEntranceDoors())
  }

  public createWindowCard(): void{
    const dialogRef = this.dialog.open(WindowComponent);

    dialogRef.afterClosed()
      .subscribe(() => this.getWindows())
  }

  public updateWindowCard(window: windowI): void{
    const dialogRef = this.dialog.open(WindowComponent, {
      data: window
    })

    dialogRef.afterClosed()
    .subscribe(() => this.getWindows());
  }

  public deleteWindowCard(id: string): void{
    this.dataBaseService
     .deleteWindow(id)
     .subscribe(() => this.getWindows())
  }

  private getWindows(): void{
    this.dataBaseService
      .getWindows()
      .subscribe((res: windowI[]) => this.windows = res)
  }

  private getFurnituras(): void{
    this.dataBaseService
      .getFurnituras()
      .subscribe((res: furnituraI[]) => this.furnituras = res)
  }

  public createFurnituraCard(): void{
    const dialogRef = this.dialog.open(FurnituraComponent);

    dialogRef.afterClosed()
      .subscribe(() => this.getFurnituras())
  }

  public updateFurnituraCard(furnitura: furnituraI): void{
    const dialogRef = this.dialog.open(FurnituraComponent, {
      data: furnitura
    })

    dialogRef.afterClosed()
      .subscribe(() => this.getFurnituras());
  }

  public deleteFurnituraCard(id: string): void{
    this.dataBaseService
      .deleteFurnitura(id)
        .subscribe(() => this.getFurnituras());
  }

  private getProductsOnMainScreen(): void{
    merge(
      this.dataBaseService.getEntranceDoors(),
      this.dataBaseService.getInteriorDoors(),
      this.dataBaseService.getFurnituras(),
      this.dataBaseService.getWindows()
    ).pipe(
      reduce((acc, cur): any => [...acc, ...cur], []),
      map((el: productMultiSingleType[]) => el.filter((el:productMultiSingleType) => el.homePage === true))
    ).subscribe((res: productMultiSingleType[]) => this.products = res);
  }

}
