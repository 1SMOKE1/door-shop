import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ProductI } from 'src/app/interfaces/product';
import { ProductModel } from 'src/app/models/product.model';
import { DataBaseService } from 'src/app/share/data-base.service';
import { SidebarComponent } from 'src/app/share/sidebar/sidebar.component';
import { map } from 'rxjs';


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
    private router: Router
    ) { }

  doors: ProductI[] = [];
  search: string = '';

  ngOnInit(): void {
    this.getDoors()
  }

  cardBigRedirect(id: string): void{
    this.selectedId = id;
    this.router.navigate(['/catalog', 'card', id], {
      state: {
        id
      }
    })
  }
  
  getFilteredProducts(products: ProductModel[]): void{
    if(products.length === 0){
      this.getDoors();
    } 
    this.doors = products;
  }

  public getFilterSlider(value: number| null): void{
    if(value === 0){
      this.getDoors();
    } else {
      if(value)
      this.dataBaseService
        .getProducts()
        .pipe(
          map((el: ProductI[]) => el.filter((el: ProductI) => el.price <= value))
        )
        .subscribe((res: ProductI[]) => this.doors = res);
    }
    
  }

  public getSearch(value: string){
    this.search = value;
  }

  private getDoors(): void{
    this.dataBaseService
      .getProducts()
      .subscribe((products: ProductI[]) => this.doors = products)
  }


}


