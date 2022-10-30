import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardInfoComponent } from './card-info/card-info.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CardPageComponent } from './card-page/card-page.component';


const routes: Routes = [
  {
   path: '', 
   component: CardPageComponent,
   children: [
    {
      path: '', pathMatch: 'full', redirectTo: 'cardlist'
    },
    {
      path: 'cardlist',
      component: CatalogComponent,
    },
    {
      path: 'card/:id',
      component: CardInfoComponent
    },
   ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsRoutingModule { }
