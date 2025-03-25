import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from '../welcome/welcome.component';
import { RegistroComponent } from '../business/registro/registro.component';
import { BusinessListComponent } from '../business/business-list/business-list.component';
import { BusinessGuard } from '../../admin/core/guards/business.guard';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'business/registro',
    component: RegistroComponent
  },
  {
    path: 'business/list',
    canActivate: [BusinessGuard],
    component: BusinessListComponent
  },
  {
    path: 'business/registro/:hash',
    canActivate: [BusinessGuard],
    component: RegistroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
