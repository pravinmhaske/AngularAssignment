import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class RoleGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {
        // this will be passed from the route config
        // on the data property
        const expectedRole = route.data.expectedRole;
        if (
            !this.auth.isAuthenticated() ||
            localStorage.getItem("admin") !== expectedRole
        ) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}