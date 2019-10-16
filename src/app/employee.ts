export class Employee {
        _id?: string;
        firstname: string;
        lastname: string;
        gender: string;
        date: string;
        email: string;
        phonenumber:number;
        photo:any;
        address_id:address;
        roles: roles[];
    }    
 
export class roles {
    role_id: string;
    role_name: number;
    }
export class address{
    address_id?: string;
    street: string;
    city: string;
    pincode: string;
}
