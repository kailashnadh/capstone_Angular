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
  public isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  public isAdmin():void|boolean{
    debugger
    if(this.isLoggedIn()){
        if(this.auth.getRole()=="ROLE_ADMIN"){
          return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
    
  }

  public isManager():void|boolean{
    if(this.isLoggedIn()){
      if(this.auth.getRole()=="ROLE_MANAGER"){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
    
  }

  public isEmployee():void|boolean{
    if(this.isLoggedIn()){
      if(this.auth.getRole()=="ROLE_USER"){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }

}
}
