import { Injectable } from '@angular/core';
import { merge, Observable, reduce, map, of, mergeMap, takeWhile, distinctUntilChanged, debounceTime } from 'rxjs';
import { productMultiSingleType } from '../interfaces/multiType';
import { productProducerI } from '../interfaces/productProducer';
import { DataBaseService } from './data-base.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  products: productMultiSingleType[] = [];
  checkBoxArr: productProducerI[] = [];
  sliderMinValue: number = 0;
  sliderMaxValue: number = 20000;
  searchValue: string = '';
  constructor(
    private dataBaseService: DataBaseService
  ) { 

  }

  trigger(): void{
    this.getProds()
      .subscribe((res: productMultiSingleType[]) => this.products = res);
  }

  fillConditionArr(condition: productProducerI): void{
    if(!this.checkBoxArr.includes(condition)){
      this.checkBoxArr.push(condition);
    } 
    else {
      this.checkBoxArr.splice(this.checkBoxArr.indexOf(condition), 1);
    }
    this.trigger()
  }

  setSliderMinValue(value: number): void{
    this.sliderMinValue = value;
    this.trigger()
  }

  setSliderMaxValue(value: number): void{
    this.sliderMaxValue = value;
    this.trigger()
  }

  setSearchValue(value: string): void{
    this.searchValue = value;
    this.trigger()
  }




  public filtration(): Observable<productMultiSingleType[]>{

    if(this.checkBoxArr.length === 0 && this.searchValue === '' && (this.sliderMinValue === 0 && this.sliderMaxValue === 20000)){
      return of(this.products)
    } 

    const $filtrationCheckbox: Observable<productMultiSingleType[]> = new Observable((suber) => {
      if(this.sliderMinValue === 0 && this.sliderMaxValue === 20000){

        for(let item of this.checkBoxArr){
          this.getProds()
            .pipe(
              map((el: productMultiSingleType[]) => 
              el.filter((el: productMultiSingleType) => el.brand === item.producerName && el.typeOfProduct === item.filtrationField)),
            )
            .subscribe((res: productMultiSingleType[]) => {
              const arr = res.sort((a: any, b: any): any => a.price - b.price)
              suber.next(arr)
            })
        }
      }
      if(this.checkBoxArr.length === 0){

        this.getProds()
          .pipe(
            map((el: productMultiSingleType[]) => 
            el.filter((el: productMultiSingleType) => 
            (el.price >= this.sliderMinValue && el.price <= this.sliderMaxValue))),
          )
          .subscribe((res: productMultiSingleType[]) => { 
            const arr = res.sort((a: any, b: any): any => a.price - b.price)
            suber.next(arr)
            
          })
      }
      if(this.checkBoxArr.length !== 0 && (this.sliderMinValue !== 0 && this.sliderMaxValue !== 20000)){

        for(let item of this.checkBoxArr){
          this.getProds()
            .pipe(
              map((el: productMultiSingleType[]) => 
              el.filter((el: productMultiSingleType) => el.brand === item.producerName && el.typeOfProduct === item.filtrationField)),
              map((el: productMultiSingleType[]) => 
              el.filter((el: productMultiSingleType) => (el.price >= this.sliderMinValue && el.price <= this.sliderMaxValue))),
            )
            .subscribe((res: productMultiSingleType[]) => {
              const arr = res.sort((a: any, b: any): any => a.price - b.price)
              suber.next(arr)
            })
        }
      }
    }
  
      
      
    )

 
    return $filtrationCheckbox.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    )
  }


  public getProds(): Observable<productMultiSingleType[]>{
    return merge(
      this.dataBaseService.getEntranceDoors(),
      this.dataBaseService.getInteriorDoors(),
      this.dataBaseService.getWindows(),
      this.dataBaseService.getFurnituras()
      )
      .pipe(
        reduce((acc, cur): any => [...acc, ...cur], []),
      )
  }

}
