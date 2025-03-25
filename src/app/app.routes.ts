import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { AuthenticatedGuard } from './admin/core/guards/auth.guard';
import { RegisterComponent } from './pages/auth/register/register.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    loadChildren: () => import('./pages/modules/modules.module').then(m => m.ModulesModule)
  },
  { path: '**', redirectTo: 'login' }
];
