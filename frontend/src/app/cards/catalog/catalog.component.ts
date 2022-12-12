import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { DataBaseService } from 'src/app/share/data-base.service';
import { SidebarComponent } from 'src/app/share/sidebar/sidebar.component';
import { merge, reduce, Observable, switchAll, map} from 'rxjs';
import { productMultiSingleType } from 'src/app/interfaces/multiType';
import { SidebarService } from 'src/app/share/sidebar.service';
import { productProducerI } from 'src/app/interfaces/productProducer';
import { NavService } from 'src/app/share/nav.service';
import { Subscription } from 'rxjs';




@Component({
  selector: 'dsa-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  
})



export class CatalogComponent implements OnInit{
  @ViewChildren(SidebarComponent) routerLinks?: QueryList<any>;

  selectedId: string = '';

  constructor(
    private dataBaseService: DataBaseService,
    private router: Router,
    private sidebarService: SidebarService,
    private navService: NavService
    ) { }

  prods: productMultiSingleType[] = []; 
  search: string = '';

  ngOnInit(): void {
    this.getProds()
      .subscribe((res: productMultiSingleType[]) => {
        this.prods = res
      })
    this.sidebarService.getProds();
  }

  cardBigRedirect(id: string): void{
    this.selectedId = id;
    this.router.navigate(['/catalog', 'card', id], {
      state: {
        id
      }
    })
  }
  
  public getFilteredProducts(products$?: Observable<productMultiSingleType[]> | any): void{
    products$ 
    .subscribe((res: productMultiSingleType[]) => {
      this.prods = res;
    })
  }

  emitScrollAction(): void{
    this.navService.animationScrollToConsultation();
  }

  public getSearch(value: string){
    this.search = value;
  }

  private getProds(): Observable<productMultiSingleType[]>{
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


