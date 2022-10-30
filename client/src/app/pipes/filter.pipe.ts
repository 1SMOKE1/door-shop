import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: any[], search: string = ''): any[] {
    if(!search.trim){
      return arr
    }

    return arr.filter((el: any) => el.name.toLowerCase().includes(search.toLowerCase()));
  }

}
