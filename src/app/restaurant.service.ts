import { Injectable,Inject } from '@angular/core';
import { User } from './user';
import { Authresponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';
import { Http, Response,Headers } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restaurantUrl = 'http://localhost:8080';

  constructor(private http: Http,@Inject(BROWSER_STORAGE) private storage: Storage) { }

  private makeAuthApiCall(urlPath: string, user: User): Promise<void | Authresponse> {
    const url: string = this.restaurantUrl + '/' + urlPath;
  
    return this.http.post(url, user).toPromise()
    .then(response => {
      debugger
      return response.json() as Authresponse;
    }).catch(this.handleError);
  }

  public login(user: User): Promise<void | Authresponse> {
    return this.makeAuthApiCall('token/generate-token', user);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
