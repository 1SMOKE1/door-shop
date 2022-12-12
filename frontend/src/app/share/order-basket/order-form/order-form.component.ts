import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from '../../data-base.service';
import { Order } from 'src/app/models/order.model';
import { CartLine } from 'src/app/models/cart-line.model';

export interface User {
  name: string;
}

@Component({
  selector: 'dsa-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  @Output()sendFormEmit: EventEmitter<Event> = new EventEmitter<Event>();
  @Output()goBackEmit: EventEmitter<Event> = new EventEmitter<Event>();
  @Input() cartLines: CartLine[] = [];
  orderForm: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'phone': new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?:\+38)?(?:\(\d{3}\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|\d{3}[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|\d{3}[0-9]{7})$/)]),
    'email': new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/)
    ]),
    'address': new FormControl('', Validators.required),
    'kindOfPayvment': new FormControl('')
  })
  constructor(
    private dataBaseService: DataBaseService
  ){}

  ngOnInit() {
  }

  submit(e: Event){
    

    const total_cost = this.cartLines.reduce((acc, el) => acc + (el.quantity * el.product.price), 0);
    const {name, phone, email, address, kindOfPayvment}: Order = this.orderForm.value;
    const newOrder: Order = {
      name,
      phone,
      email,
      address,
      cartLines: this.cartLines,
      shiped: false,
      total_cost,
      kindOfPayvment
    }
    this.dataBaseService
      .createOrder(newOrder)
      .subscribe((res: Order) => console.log(res))
    this.sendFormEmit.emit(e)
  }

  goBack(e: Event): void{
    this.goBackEmit.emit(e);
  }

  
}
