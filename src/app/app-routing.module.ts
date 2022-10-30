import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  // {
  //   path: 'login',
  //   loadChildren: () => import('./auth/login/login.module').then((m) => m.LoginModule),
  //   canLoad: [AuthGuard],
  //   pathMatch: 'full',
  // },
  {
    path: 'registration',
    loadChildren: () => import('./auth/registration/registration.module').then((m) => m.RegistrationModule),
    // canLoad: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () => import('./modules/system.module').then((m) => m.SystemModule),
    // canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
