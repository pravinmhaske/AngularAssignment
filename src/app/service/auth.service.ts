import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
    constructor() { }
    public isAuthenticated(): boolean {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated === "true") {
            return true;
        }
        return false;;
    }
}