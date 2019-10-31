import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { AuthenticationService } from '../authentication.service';
import { Employee, address } from '../employee';
import { DomSanitizer } from '@angular/platform-browser';
import { Empupdate } from '../empupdate';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private restaurantService: RestaurantService,private authenticationService: AuthenticationService,private sanitizer: DomSanitizer) { }
  employee: Employee;
  update:boolean=false;
  readonly:boolean=true;
  public selectedFile;
  public newemp = {
    name: '',
    email: '',
    password: ''
  };
  updateemp:Empupdate=new Empupdate();
  empaddress:address=new address()
  private getMyProfile():void{

    this.restaurantService.getEmployeebyEmail(this.authenticationService.getCurrentUserEmail()).then((employee:Employee)=>{
      console.log(employee);
      this.employee=employee
      }) 
    }

    public onFileChanged(event){
      console.log(event);
      this.selectedFile=event.target.files[0];
      let reader=new FileReader();
      reader.onload = e => this.employee.photo = reader.result;

      reader.readAsDataURL(this.selectedFile);

    }

    private getImage(bytevalue):void|any{
      let base64String =bytevalue;
      var url;
      
     if(bytevalue){
      if(bytevalue.startsWith("data:image")){
        url=bytevalue;
      }
      else{
        url = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,'+ base64String);
      }
       
      }
      else{
        url="assets/image.jpg";
      }
      return url;
    }
    

    onUpdate(){
      this.update=true;
      this.readonly=false;
    }

    onSaveChanges(){
      this.update=false;
      this.readonly=true;
      const uploadData=new FormData();
      this.updateemp.emp_id=this.employee.emp_id;
      this.updateemp.firstname=this.employee.firstname;
      this.updateemp.lastname=this.employee.lastname;
      this.updateemp.phonenumber=this.employee.phonenumber;
      this.updateemp.date=this.employee.date;
      this.updateemp.gender=this.employee.gender;
      this.updateemp.email=this.employee.email;
      
      // debugger
      this.empaddress.address_id=this.employee.address_id.address_id;
      this.empaddress.city=this.employee.address_id.city;
      this.empaddress.pincode=this.employee.address_id.pincode;
      this.empaddress.street=this.employee.address_id.street;
      this.updateemp.address_id=this.empaddress;
      uploadData.append('myFile',this.selectedFile);
      uploadData.append("employee",JSON.stringify(this.updateemp));
      debugger
      this.employee.photo=uploadData;
      this.restaurantService.updateEmployeeProfile(uploadData);
    }
  

  ngOnInit() {
    this.getMyProfile();
  }

}
