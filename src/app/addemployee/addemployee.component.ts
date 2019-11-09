import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Employee } from '../employee';
import { RestaurantService } from '../restaurant.service';
import { CreateEmployee } from '../create-employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  registerForm:FormGroup;
  roles = [];
  submitted = false;
  public employee:CreateEmployee={
    firstname: '',
    lastname: '',
    email: '',
    password:'',
    gender: '',
    date: '',
    phonenumber:null,
    photo:'',
    address_id:{
      address_id:'',
      street: '',
    city: '',
    pincode:''
    },
    roles: [{
      role_id:'',
      role_name:''

    }]
  };

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private router: Router,private restaurantService:RestaurantService) { }

  getRoles() {
    return [
      { id: '2', name: 'Manager' },
      { id: '3', name: 'Employee' }
    ];
  }

  onRegister() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
    this.employee.firstname=this.registerForm.value.firstName;
    this.employee.lastname=this.registerForm.value.lastName;
    this.employee.phonenumber=this.registerForm.value.phoneNumber;
    this.employee.email=this.registerForm.value.email;
    this.employee.roles[0].role_id=this.registerForm.value.roles;
    if(this.employee.roles[0].role_id=='2'){
    this.employee.roles[0].role_name='MANAGER'
    }
    else if(this.employee.roles[0].role_id=='3'){
      this.employee.roles[0].role_name='EMPLOYEE'
    }
    this.employee.password=this.registerForm.value.email;
    this.restaurantService.addEmployeebyAdmin(this.employee)
    .then((emp:Employee)=>{
      console.log(emp);
      this.router.navigate(['employee',emp.emp_id]);
    })
    console.log(this.employee);
   
  
}
get f() { return this.registerForm.controls; }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roles: ['']
    });

    of(this.getRoles()).subscribe(roles => {
      this.roles = roles;
      this.registerForm.controls.roles.patchValue(this.roles[0].id);
    });
  }

}
