import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { AuthGuard } from './admin/auth-guards/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MainComponent } from './store/main/main.component';

const routes: Routes = [
  {path: '',  redirectTo: 'store', pathMatch: 'full'},
  {path: 'store', component: MainComponent},
  {path: 'login', component: AuthComponent},
  {
    path: 'admin',
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
