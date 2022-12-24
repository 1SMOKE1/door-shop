import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { LineComponent } from './line/line.component';
import { FooterComponent } from './footer/footer.component';
import { StoreRoutingModule } from '../store/store-routing.module';
import { OurManufacturersComponent } from './our-manufacturers/our-manufacturers.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { OrderBasketComponent } from './order-basket/order-basket.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderFormComponent } from './order-basket/order-form/order-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FilterPipe } from '../pipes/filter.pipe';
import { MatIconModule } from '@angular/material/icon';
import { NavLogoComponent } from './nav-logo/nav-logo.component';
import { NavDialogComponent } from './nav/nav-dialog/nav-dialog.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlCarouselComponent } from './owl-carousel/owl-carousel.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    LineComponent,
    FooterComponent,
    OurManufacturersComponent,
    CarouselComponent,
    SidebarComponent,
    OrderBasketComponent,
    OrderFormComponent,
    FilterPipe,
    NavLogoComponent,
    NavDialogComponent,
    OwlCarouselComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSliderModule,
    MatDialogModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    MatIconModule,
    CarouselModule,
    NgxSliderModule
    ],
  exports: [
    HeaderComponent,
    NavComponent,
    NavLogoComponent,
    LineComponent,
    FooterComponent,
    OurManufacturersComponent,
    CarouselComponent,
    SidebarComponent,
    OrderBasketComponent,
    OrderFormComponent,
    FilterPipe,
    OwlCarouselComponent
  ]
})
export class ShareModule { }
