import { Injectable } from '@angular/core';
import { merge, Observable, reduce, map, of, mergeMap, takeWhile } from 'rxjs';
import { productMultiSingleType } from '../interfaces/multiType';
import { productProducerI } from '../interfaces/productProducer';
import { DataBaseService } from './data-base.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  products: productMultiSingleType[] = [];
  checkBoxArr: productProducerI[] = [];
  sliderValue: number = 0;
  searchValue: string = '';
  constructor(
    private dataBaseService: DataBaseService
  ) { 

  }

  trigger(): void{
    this.getProds()
      .subscribe((res: productMultiSingleType[]) => this.products = res);
    console.log(this.products, this.searchValue, this.sliderValue, 'all conds')
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

  setSliderValue(value: number): void{
    this.sliderValue = value;
    this.trigger()
  }

  setSearchValue(value: string): void{
    this.searchValue = value;
    this.trigger()
  }




  public filtration(): Observable<productMultiSingleType[]>{
    console.log('фильтруй')

    if(this.checkBoxArr.length === 0 && this.searchValue === '' && this.sliderValue === 0 ){
      return of(this.products)
    } 

    const $filtrationCheckbox: Observable<productMultiSingleType[]> = new Observable((suber) => {
      if(this.sliderValue === 0){
        console.log('checkboxArrWorks')
        for(let item of this.checkBoxArr){
          this.getProds()
            .pipe(
              map((el: productMultiSingleType[]) => 
              el.filter((el: productMultiSingleType) => el.brand === item.producerName && el.typeOfProduct === item.filtrationField))
            )
            .subscribe((res: productMultiSingleType[]) => {
              suber.next(res)
            })
        }
      }
      if(this.checkBoxArr.length === 0){
        console.log('slider works')
        this.getProds()
          .pipe(
            map((el: productMultiSingleType[]) => 
            el.filter((el: productMultiSingleType) => el.price <= this.sliderValue))
          )
          .subscribe((res: productMultiSingleType[]) => {
            suber.next(res);

          })
      }
      if(this.checkBoxArr.length !== 0 && this.sliderValue !== 0){
        console.log('both works')
        for(let item of this.checkBoxArr){
          this.getProds()
            .pipe(
              map((el: productMultiSingleType[]) => 
              el.filter((el: productMultiSingleType) => el.brand === item.producerName && el.typeOfProduct === item.filtrationField)),
              map((el: productMultiSingleType[]) => 
              el.filter((el: productMultiSingleType) => el.price <= this.sliderValue)),
            )
            .subscribe((res: productMultiSingleType[]) => {
              suber.next(res)
            })
        }
      }
    }
  
      
      
    )

 
    return $filtrationCheckbox
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
