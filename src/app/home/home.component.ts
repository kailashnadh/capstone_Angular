import { Component } from '@angular/core';
import { AuthGuardService as AuthGuard } from '../auth-guard.service';
import { RoleguardService as RoleGuard } from '../roleguard.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public auth: AuthenticationService) { }
  
  get role() {
    return this.auth.getRole();
  }

}
