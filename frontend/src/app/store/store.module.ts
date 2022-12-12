import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { MainComponent } from './main/main.component';
import { ShareModule } from '../share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HowOrderComponent } from './how-order/how-order.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ShowCertificateComponent } from './certificates/show-certificate/show-certificate.component';
import { GuaranteeComponent } from './guarantee/guarantee.component';
import { ChooseDoorComponent } from './choose-door/choose-door.component';
import { DoorMeasurementComponent } from './door-measurement/door-measurement.component';
import { DoorInstallationComponent } from './door-installation/door-installation.component';
import { DesignersBuildersComponent } from './designers-builders/designers-builders.component';
import { CommentsComponent } from './comments/comments.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [
    MainComponent,
    HowOrderComponent,
    ContactsComponent,
    CertificatesComponent,
    ShowCertificateComponent,
    GuaranteeComponent,
    ChooseDoorComponent,
    DoorMeasurementComponent,
    DoorInstallationComponent,
    DesignersBuildersComponent,
    CommentsComponent,

  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    ShareModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule, 
    MatSidenavModule, 
    FormsModule,
  ],
  exports: [
    StoreRoutingModule
  ]
})
export class StoreModule { }
