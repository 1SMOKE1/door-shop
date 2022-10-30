import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { productProducerI } from 'src/app/interfaces/productProducer';
import { ProductModel } from 'src/app/models/product.model';
import { DataBaseService } from '../data-base.service';
import { map } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'dsa-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() public filteredProducts: EventEmitter<ProductModel[]> = new EventEmitter<ProductModel[]>();
  @Output() public filterSlider: EventEmitter<number | null> = new EventEmitter<number | null>();

  checkBoxArr: productProducerI[] = [];

  comeInDoors: productProducerI[] = [];
  comeThrowDoors: productProducerI[] = [];
  furniture: productProducerI[] = []; 

  panelOpenState = false;

  @Output() public search: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private dataBaseService: DataBaseService
  ) { }

  ngOnInit(): void {
    this.getProductProducers();
  }

  toggle(e: Event): void{
    let cur = e.currentTarget as HTMLElement;
    cur.classList.toggle('active');
  }

  changeSlider(value: number | null): void{
    this.filterSlider.emit(value);
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    
    return value;
  }

  private getProductProducers(): void{
    this.dataBaseService
      .getProductProducers()
      .subscribe((res: productProducerI[]) => {
        this.comeInDoors = res.filter((el: productProducerI) => el.filtrationField === 'Двері вхідні');
        this.comeThrowDoors = res.filter((el: productProducerI) => el.filtrationField === 'Двері міжкімнатні');
        this.furniture = res.filter((el: productProducerI) => el.filtrationField === 'Фурнітура')
      })
  }

  public filtrationProducts(condition: productProducerI): void{


    if(!this.checkBoxArr.includes(condition)){
      this.checkBoxArr.push(condition);
    } else {
      this.checkBoxArr.splice(this.checkBoxArr.indexOf(condition), 1);
    }

    const filteredArr: any = [];
    for(let item of this.checkBoxArr){
      this.dataBaseService
        .getProducts()
        .pipe(
          map((el: ProductModel[]) => el.filter((el: ProductModel) => el.brand === item.producerName && el.type_of_product === item.filtrationField))
        ).subscribe((res: ProductModel[]) => {
          filteredArr.push(res)
          this.filteredProducts.emit(filteredArr.flat())

          
        })
    }    
    if(this.checkBoxArr.length === 0){
      this.filteredProducts.emit([]);
    }
  } 

  inputSearch(e: Event): void{
    let cur = e.target as HTMLInputElement;
    this.search.emit(cur.value)
  }

}
