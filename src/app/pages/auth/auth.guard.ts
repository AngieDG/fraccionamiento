import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from 'app/services/auth/login.service';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(
    public loginService: LoginService,
    private router: Router
  ) {}
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
     
    if ( !this.loginService.token || !this.loginService.identity || !this.loginService.identity._id ) { 
      this.router.navigate(['']);
      return false;
    } else {
      return true; 
    }
  }

  
}
