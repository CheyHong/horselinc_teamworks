import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    public userType: string;

    constructor() 
    { 
        this.userType = 'manager';
    }
    setUserType(type: string): void{
        this.userType = type;
    }
    getUserType(): string{
        return this.userType;
    }
}
