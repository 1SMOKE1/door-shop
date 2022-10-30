import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { CardPageComponent } from './card-page/card-page.component';
import { CardInfoComponent } from './card-info/card-info.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ShareModule } from '../share/share.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    CardPageComponent,
    CardInfoComponent,
    CatalogComponent
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    ShareModule,
    MatExpansionModule
  ]
})
export class CardsModule { }
