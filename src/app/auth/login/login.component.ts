import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User, LoginRequest } from '../services/models/user';
import { PermissionsMap } from '../services/models/permissions.model';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  _permissions: PermissionsMap[];
  _loginRequest: LoginRequest = new LoginRequest();
  _user: Observable<User>;
  isLoading = false;

  constructor(public authService: AuthService, private router: Router, private toaster: ToastService) {}

  ngOnInit(): void {
    this._user = this.authService.user$;
    this._user.subscribe(user => {
      if (user) {
        this.router.navigate(['/layouts']);
      }
    });
  }

  login() {
    this.isLoading = true;
    this.authService
      .signIn(this._loginRequest)
      .then(value => {
        this.isLoading = false;
        this.router.navigate(['/layouts']);
      })
      .catch(error => {
        this.toaster.openSnackBar(error.message);
        this.isLoading = false;
      });
  }

}
