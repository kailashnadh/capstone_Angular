export class Employee {
        emp_id?: string;
        firstname: string;
        lastname: string;
        gender: string;
        date: string;
        email: string;
        phonenumber:string;
        photo:any;
        address_id:address;
        roles: roles[];
        managerid?:string;
    }    
 
export class roles {
    role_id: string;
    role_name: string;
    }
export class address{
    address_id:string;
    street: string;
    city: string;
    pincode: string;
}
