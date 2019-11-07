import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  registerForm:FormGroup;
  roles = [];
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  


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
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  
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
