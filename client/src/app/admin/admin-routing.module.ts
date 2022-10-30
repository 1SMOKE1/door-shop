import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { OrdersComponent } from './main/orders/orders.component';
import { OurWorksComponent } from './main/our-works/our-works.component';
import { ProductsComponent } from './main/products/products.component';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent, 
   children: [
    {path: '', redirectTo: 'products', pathMatch: 'full'},
    {path: 'products', component: ProductsComponent},
    {path: 'orders', component: OrdersComponent},
    {path: 'our-works', component: OurWorksComponent},
   ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
