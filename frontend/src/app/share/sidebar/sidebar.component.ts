import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { productProducerI } from 'src/app/interfaces/productProducer';
import { DataBaseService } from '../data-base.service';
import { productMultiSingleType } from 'src/app/interfaces/multiType';
import { SidebarService } from '../sidebar.service';
import { Observable } from 'rxjs';
import { ChangeContext, LabelType, Options } from '@angular-slider/ngx-slider';


@Component({
  selector: 'dsa-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() public filteredProducts: EventEmitter<Observable<productMultiSingleType[]>> = new EventEmitter<Observable<productMultiSingleType[]>>();
  @Output() public search: EventEmitter<string> = new EventEmitter<string>();
  value: number = 0;
  highValue: number = 20000;
  options: Options = {
    floor: 0,
    ceil: 20000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> $" + value;
        case LabelType.High:
          return "<b>Max price:</b> $" + value;
        default:
          return "$" + value;
      }
    },
    combineLabels: (minValue: string, maxValue: string): string => {
      if (minValue === 'Any' && maxValue === 'Any') return minValue;
      if (minValue === '5+' && maxValue === '5+') return maxValue;
      if (minValue === maxValue) return minValue;
      else return minValue + ' - ' + maxValue;
    },
  };
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


  inputSearch(e: Event): void{
    let cur = e.target as HTMLInputElement;
    this.sidebarService.setSearchValue(cur.value)
    this.search.emit(cur.value)

    this.filteredProducts.emit(this.sidebarService.filtration())
  }

  

  getEvent(e: ChangeContext) {
    this.sidebarService.setSliderMinValue(e.value);
    if(e.highValue){
      this.sidebarService.setSliderMaxValue(e.highValue);
    } 
    this.filteredProducts.emit(this.sidebarService.filtration())
  }

}
