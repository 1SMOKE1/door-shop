import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ShareModule } from '../share/share.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './main/products/products.component';
import { OrdersComponent } from './main/orders/orders.component';
import { OurWorksComponent } from './main/our-works/our-works.component';
import { ProductCreateFormComponent } from './main/product/product-create-form/product-create-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ProductProducerComponent } from './main/product-producer/product-producer.component';
import { MatListModule } from '@angular/material/list';
import { OurWorksDialogComponent } from './main/our-works/our-works-dialog/our-works-dialog.component';
import { OurCommentsDialogComponent } from './main/our-works/our-comments-dialog/our-comments-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    MainComponent,
    ProductsComponent,
    OrdersComponent,
    OurWorksComponent,
    ProductCreateFormComponent,
    ProductProducerComponent,
    OurWorksDialogComponent,
    OurCommentsDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ShareModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule
  ]
})
export class AdminModule { }
