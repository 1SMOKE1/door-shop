import { Component, OnInit, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductI } from 'src/app/interfaces/product';
import { DataBaseService } from 'src/app/share/data-base.service';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OrderBasketComponent } from 'src/app/share/order-basket/order-basket.component';
import { CartService } from 'src/app/share/cart.service';


@Component({
  selector: 'dsa-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit {
  window: Window | null;
  
  product: ProductI | null = null;
  prodId: string = '';
  photoArr: string[] = ['', '', '', ''];
  constructor(
    private dataBaseService: DataBaseService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public cartService: CartService,
    @Inject(DOCUMENT) private docRef: Document,
    ) {
      this.prodId = route.snapshot.params?.['id'];
      this.window = docRef.defaultView;
  }

  ngOnInit(): void {
    this.window?.scrollTo(0,350)
    this.dataBaseService
      .getProducts()
      .pipe(
        map((data: ProductI[]) => 
        data.filter((el: ProductI) => el._id === this.prodId)[0]
      ))
        .subscribe((product: ProductI) => this.product = product  )
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

}
