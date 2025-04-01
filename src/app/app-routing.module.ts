import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { RoleGuard } from './auth/role.guard';
import { NgModule } from '@angular/core';
import { AuthSigninComponent } from './demo/pages/authentication/auth-signin/auth-signin.component';
import { DashboardComponent } from './demo/customer/dashboard.component';
import MenuComponent from './demo/pages/menu-Items/list-menu/menu.component';
import MenuCatalogComponent from './demo/pages/menu-catagroy/list-menu-catalog/menu-catalog.component';

export const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth/signin',
        pathMatch: 'full'
      },
      {
        path: 'auth/signin', 
        component: AuthSigninComponent,
      },
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [RoleGuard],
        data: { roles: ['Customer'] }  
      },
      {
        path: 'forms',
        component: MenuCatalogComponent,
        canActivate: [RoleGuard],
        data: { roles: ['Manager'] }
      },
      {
        path: 'tables',
        component: MenuComponent,
        canActivate: [RoleGuard],
        data: { roles: ['Manager'] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
