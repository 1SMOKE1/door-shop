import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificatesComponent } from './certificates/certificates.component';
import { ChooseDoorComponent } from './choose-door/choose-door.component';
import { CommentsComponent } from './comments/comments.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DesignersBuildersComponent } from './designers-builders/designers-builders.component';
import { DoorInstallationComponent } from './door-installation/door-installation.component';
import { DoorMeasurementComponent } from './door-measurement/door-measurement.component';
import { GuaranteeComponent } from './guarantee/guarantee.component';
import { HowOrderComponent } from './how-order/how-order.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: 'store', component: MainComponent},
  {path: 'how-order', component: HowOrderComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'certificates', component: CertificatesComponent},
  {path: 'guarantee', component: GuaranteeComponent},
  {path: 'choose-door', component: ChooseDoorComponent},
  {path: 'door-measurement', component: DoorMeasurementComponent},
  {path: 'door-installation', component: DoorInstallationComponent},
  {path: 'designers-builders',component: DesignersBuildersComponent},
  {path: 'comments', component: CommentsComponent},
  {path: 'catalog', loadChildren: () => import('../cards/cards.module').then((m) => m.CardsModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
