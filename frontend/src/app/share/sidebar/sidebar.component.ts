import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { productProducerI } from 'src/app/interfaces/productProducer';
import { DataBaseService } from '../data-base.service';
import { productMultiSingleType } from 'src/app/interfaces/multiType';
import { SidebarService } from '../sidebar.service';
import { merge, Observable, reduce } from 'rxjs';


@Component({
  selector: 'dsa-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() public filteredProducts: EventEmitter<Observable<productMultiSingleType[]>> = new EventEmitter<Observable<productMultiSingleType[]>>();
  @Output() public search: EventEmitter<string> = new EventEmitter<string>();
  

  checkBoxArr: productProducerI[] = [];

  entranceDoorProducers: productProducerI[] = [];
  interiorDoorProducers: productProducerI[] = [];
  windowProducers: productProducerI[] = [];
  furnitureProducers: productProducerI[] = []; 

  panelOpenState = false;

 

  constructor(
    private dataBaseService: DataBaseService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    this.getProductProducers();
  }

  toggle(e: Event): void{
    let cur = e.currentTarget as HTMLElement;
    cur.classList.toggle('active');
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
        this.entranceDoorProducers = res.filter((el: productProducerI) => el.filtrationField === 'Двері вхідні');
        this.interiorDoorProducers = res.filter((el: productProducerI) => el.filtrationField === 'Двері міжкімнатні');
        this.windowProducers = res.filter((el: productProducerI) => el.filtrationField === 'Вікна');
        this.furnitureProducers = res.filter((el: productProducerI) => el.filtrationField === 'Фурнітура')
      })
  }


  fillConditionArr(condition: productProducerI): void{
    this.sidebarService.fillConditionArr(condition);
    this.filteredProducts.emit(this.sidebarService.filtration())
    
  }


  changeSlider(value: number | null): void{
    if(typeof value === 'number'){
      this.sidebarService.setSliderValue(value);
      this.filteredProducts.emit(this.sidebarService.filtration())
    }
  }

  inputSearch(e: Event): void{
    let cur = e.target as HTMLInputElement;
    this.sidebarService.setSearchValue(cur.value)
    this.search.emit(cur.value)

    this.filteredProducts.emit(this.sidebarService.filtration())
  }

}
