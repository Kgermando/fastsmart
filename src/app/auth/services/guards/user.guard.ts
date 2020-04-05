import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  isLogged: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.user.asObservable().subscribe(status => {
      this.isLogged = !!status;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLogged ? this.router.navigate(['user']) : true;
  }
}

