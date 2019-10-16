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
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { EmployeehomeComponent } from './employeehome/employeehome.component';
import { ManagerhomeComponent } from './managerhome/managerhome.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FrameworkComponent,
    HomeComponent,
    AddemployeeComponent,
    AdminhomeComponent,
    EmployeehomeComponent,
    ManagerhomeComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent
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
        path: 'employee/:employeeId',
        component: EmployeeDetailsComponent
      },
      {
        path:'AddEmployee',
        component:AddemployeeComponent,
        canActivate:[RoleGuard],
        data: { 
             expectedRole: 'ROLE_ADMIN'
        }
      },
        {
        
        path:'GetEmployees',
          component:EmployeeListComponent,
          canActivate:[RoleGuard],
          data: { 
               expectedRole: 'ROLE_ADMIN'
          }

      }
      // { 
        // I commited
        
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
