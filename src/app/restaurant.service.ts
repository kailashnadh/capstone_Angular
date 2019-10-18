import { Injectable,Inject } from '@angular/core';
import { User } from './user';
import { Authresponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';
import { Http, Response,Headers } from '@angular/http';
import { Employee } from './employee';


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
   //get(api/employees)
   getAllEmployees(): Promise<void | Employee[]> {
    const url: string = this.restaurantUrl + '/api/employee/all';
    const headers = new Headers({ 'Authorization':  `Bearer ${this.storage.getItem('restaurant-token')}` });
    return this.http.get(url,{ headers: headers}).toPromise().then(response => response.json() as Employee[]).catch(this.handleError);
  }

  public login(user: User): Promise<void | Authresponse> {
    return this.makeAuthApiCall('token/generate-token', user);
  }

  deleteEmployee(employeeid: string): Promise<void | string> {
    var deleteurl = this.restaurantUrl + '/api/employee/' + employeeid;
    console.log(deleteurl);
    const headers = new Headers({ 'Authorization':  `Bearer ${this.storage.getItem('restaurant-token')}` });
    return this.http.delete(deleteurl,{ headers: headers}).toPromise().then(response => response.json() as string).catch(this.handleError);
  }

  getSingleEmployee(employeeId: string): Promise<void | Employee> {
    var singleUrl = this.restaurantUrl + '/api/employee/' + employeeId;
    const headers = new Headers({ 'Authorization':  `Bearer ${this.storage.getItem('restaurant-token')}` });
    return this.http.get(singleUrl,{ headers: headers}).toPromise().then(response => response.json() as Employee).catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
