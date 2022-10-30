import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { DataBaseService } from 'src/app/share/data-base.service';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { productProducerI } from 'src/app/interfaces/productProducer';

export type orderType =  'Усі' | 'Відкриті' | 'Закриті' ;

@Component({
  selector: 'dsa-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor(
    private dataBaseService: DataBaseService,
    private snackBar: MatSnackBar
  ) { }
 
  ngOnInit(): void {
    this.getOrders();
  }

  

  public confirmOrder(order: Order): void{
    const {name, phone, address, email, cartLines, shiped, total_cost, kindOfPayvment, _id} = order
    const newOrder = new Order(
      name,
      phone, 
      address,
      email,
      cartLines,
      !shiped,
      total_cost,
      kindOfPayvment,
      _id
    )
    this.dataBaseService
      .compliteOrder(newOrder)
      .subscribe((res: Order) => {
        this.getOrders()
      })
      
  }


  private getOrders(): void{
    this.dataBaseService
      .getOrders()
      .subscribe((orders: Order[]) => this.orders = orders) 
  }

  toggleOrderType(val: orderType): void{
    switch(val){
      case 'Усі': 
        this.getOrders();
        break;
      case 'Відкриті':
        this.getShippedOrders(false);
        break;
      case 'Закриті':
        this.getShippedOrders(true);
        break;
      default: 
        this.getOrders();
        break;
    }
  }
  
  


  private getShippedOrders(condition: boolean): void{
    this.dataBaseService
      .getOrders()
      .pipe(
        map((el: Order[]) => el.filter((el: Order) => el.shiped === condition))
      ).subscribe((orders: Order[]) => this.orders = orders)
  }

  deleteOrder(id: string | undefined): void{
    if(id){
      this.dataBaseService
      .deleteOrder(id)
      .subscribe((order: Order) => {
        this.snackBar.open(order._id + ' Було успішно видалено', 'X', {
        duration: 2000
        })
        this.getOrders();
      })
    }
  }


}
