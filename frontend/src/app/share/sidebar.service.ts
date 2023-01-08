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

  fillConditionArr(condition: productProducerI): void{
    if(!this.checkBoxArr.includes(condition)){
      this.checkBoxArr.push(condition);
    } 
    else {
      this.checkBoxArr.splice(this.checkBoxArr.indexOf(condition), 1);
    }
  }

  setSliderMinValue(value: number): void{
    this.sliderMinValue = value;
  }

  setSliderMaxValue(value: number): void{
    this.sliderMaxValue = value;
  }

  setSearchValue(value: string): void{
    this.searchValue = value;
  }


  public filtration(): Observable<productMultiSingleType[]>{

    

    const $filtrationCheckbox: Observable<productMultiSingleType[]> = new Observable((suber) => {
      if(this.sliderMinValue === 0 && this.sliderMaxValue === 20000){

        this.dataBaseService
          .filterCheckBox(this.checkBoxArr)
          .subscribe((res: productMultiSingleType[]) => {
            const arr = res.sort((a: any, b: any): any => a.price - b.price)
            if(arr.length === 0){
              this.getProds()
              .subscribe((res: productMultiSingleType[]) => {
                const arr = res.sort((a: any, b: any): any => a.price - b.price)
                suber.next(arr)
              })
            } else {
              suber.next(arr)
            }
          })
        
      }
      if(this.checkBoxArr.length === 0){
        this.getProds()
          .pipe(
            map((el: productMultiSingleType[]) => 
            el.filter((el: productMultiSingleType) => el.price >= this.sliderMinValue && el.price <= this.sliderMaxValue)),
          )
          .subscribe((res: productMultiSingleType[]) => { 
            const arr = res.sort((a: any, b: any): any => a.price - b.price)
            suber.next(arr)
          })
      }
      // для чекбоксов и слайдера
      if(this.checkBoxArr.length !== 0 && (this.sliderMinValue !== 0 || this.sliderMaxValue !== 20000)){
        this.dataBaseService
          .filterCheckBox(this.checkBoxArr)
          .pipe(
            map((el: productMultiSingleType[]) => 
            el.filter((el: productMultiSingleType) => (el.price >= this.sliderMinValue && el.price <= this.sliderMaxValue))),
          )
          .subscribe((res: productMultiSingleType[]) => {
            const arr = res.sort((a: any, b: any): any => a.price - b.price)
            suber.next(arr)
          })
      }
      if(this.checkBoxArr.length === 0 && this.searchValue === '' && (this.sliderMinValue === 0 && this.sliderMaxValue === 20000)){
        this.getProds()
          .subscribe((res: productMultiSingleType[]) => {
            const arr = res.sort((a: any, b: any): any => a.price - b.price)
            suber.next(arr)
          })
      } 
    })

 
    return $filtrationCheckbox.pipe(  
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
