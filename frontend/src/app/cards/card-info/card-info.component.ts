import { Component, OnInit, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DataBaseService } from 'src/app/share/data-base.service';
import { map, merge, scan } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OrderBasketComponent } from 'src/app/share/order-basket/order-basket.component';
import { CartService } from 'src/app/share/cart.service';
import { productMultiSingleType } from 'src/app/interfaces/multiType';
import { entranceDoorModel } from 'src/app/models/entranceDoor.model';
import { interiorDoorModel } from 'src/app/models/interiorDoor.model';
import { windowModel } from 'src/app/models/window.model';
import { FurnituraModel } from 'src/app/models/furnitura.model';
import { NavService } from 'src/app/share/nav.service';


@Component({
  selector: 'dsa-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit {
  window: Window | null;
  
  product: productMultiSingleType | null | any = null;
  prodId: string = '';
  photoArr: string[] = ['', '', '', ''];
  entranceDoor: entranceDoorModel | null = null;
  interiorDoor: interiorDoorModel | null = null;
  windowM: windowModel | null = null;
  furnitura: FurnituraModel | null = null;

  constructor(
    private dataBaseService: DataBaseService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public cartService: CartService,
    @Inject(DOCUMENT) private docRef: Document,
    private navService: NavService
    ) {
      this.prodId = route.snapshot.params?.['id'];
      this.window = docRef.defaultView;
      {
        switch(this.product?.typeOfProduct){
          case 'Двері вхідні': 
            this.product = this.entranceDoor;
              break;
          case 'Двері міжкімнатні':
            this.product = this.interiorDoor;
              break;
          case 'Вікна':
            this.product = this.windowM;      
            break;
          case 'Фурнітура':
            this.product = this.furnitura;
              break
          default: null
        }
      }
  }

  ngOnInit(): void {
    this.window?.scrollTo(0,350)
    merge(
      this.dataBaseService.getEntranceDoors(),
      this.dataBaseService.getInteriorDoors(),
      this.dataBaseService.getWindows(),
      this.dataBaseService.getFurnituras()
      )
      .pipe(
        scan((acc, cur) => [...acc, ...cur]),
        map((data: productMultiSingleType[]) => data.filter((el: productMultiSingleType) => el._id === this.prodId)[0])
      ).subscribe((res: any) => {
        this.product = res
      })
  }

  toBasket(): void{
    this.dialog.open(OrderBasketComponent, {
      data: {
        product: this.product
      }
    })
    if(this.product){
      this.cartService.addCartLine(this.product)
    }
    
  }

  emitScrollAction(): void{
    this.navService.scrollToConsultationAnim();
  }


}
