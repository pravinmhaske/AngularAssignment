import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { EditUserComponent } from './common/edit-user/edit-user.component';
import { ListUsersComponent } from './common/list-users/list-users.component';
import { LoginComponent } from './login/login.component';
import {
  AuthGuardService as AuthGuard
} from './service/auth-guard.service';
import {
  RoleGuardService as RoleGuard
} from './service/role-guard.service';
const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '', pathMatch: 'full', redirectTo: 'user-list', canActivate: [AuthGuard] },
  {
    path: 'add-user', component: AddUserComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'admin'
    }
  },
  { path: 'edit-user', component: EditUserComponent, canActivate: [AuthGuard] },
  { path: 'user-list', component: ListUsersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
