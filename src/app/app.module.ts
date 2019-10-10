import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FrameworkComponent } from './framework/framework.component';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { HomeComponent } from './home/home.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { RoleguardService as RoleGuard } from './roleguard.service';
import { HasroleDirective } from './hasrole.directive';
import { AddemployeeComponent } from './addemployee/addemployee.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FrameworkComponent,
    HomeComponent,
    HasroleDirective,
    AddemployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'AddEmployee',
        component:AddemployeeComponent,
        canActivate:[RoleGuard],
        data: {
             expectedRole: 'ROLE_ADMIN'
        }
      }
      //hiiiiiiiiiiiiiiiiiiiiiiii
      // {
      //   path: 'admin',
      //   component: AdminComponent,
      //   canActivate: [RoleGuard],
      //   data: {
      //     expectedRole: 'ROLE_ADMIN'
      //   }
      // },
      // {
      //   path: 'manager',
      //   component: ManagerComponent,
      //   canActivate: [RoleGuard],
      //   data: {
      //     expectedRole: 'ROLE_MANAGER'
      //   }
      // },
      // {
      //   path: 'employee',
      //   component: EmployeeComponent,
      //   canActivate: [RoleGuard],
      //   data: {
      //     expectedRole: 'ROLE_EMPLOYEE'
      //   }
      // }
    ]),
    FormsModule,
    HttpModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  JwtHelperService],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
