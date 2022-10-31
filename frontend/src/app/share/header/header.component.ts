import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderBasketComponent } from '../order-basket/order-basket.component';


@Component({
  selector: 'dsa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(
    public dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute,
    
    ) {
      
     }

  ngOnInit(): void {
  }

  toBasket(): void{
    this.dialog.open(OrderBasketComponent, {
      data: {
        num: 123
      }
    })
  }


}
