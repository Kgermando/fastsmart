import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/services/models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users$: Observable<User[]>;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.users$ = this.authService.getAllUsers();
  }

  

}
