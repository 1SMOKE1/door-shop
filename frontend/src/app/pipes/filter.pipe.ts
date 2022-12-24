import { Pipe, PipeTransform } from '@angular/core';
import { SidebarService } from '../share/sidebar.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  private checkBoxArr: string[] = [];
  constructor(
    private sidebarService: SidebarService
  ){}
  transform(arr: any[], search: string = ''): any[] {
    if(!search.trim){
      return arr
    }
    // if(!this.checkBoxArr.includes(condition)){
    //   this.checkBoxArr.push(condition);
    // } 
    // else {
    //   this.checkBoxArr.splice(this.checkBoxArr.indexOf(condition), 1);
    //   console.log(this.checkBoxArr)
    // }
    return arr.filter((el: any) => el.name.toLowerCase().includes(search.toLowerCase()));
  }

}
