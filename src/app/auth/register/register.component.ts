import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../services/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  detailForm: FormGroup;
  user$: Observable<User> = this.auth.user$

  constructor(public fb: FormBuilder, public auth: AuthService) { }

  ngOnInit(): void {
    // First Step
    this.signupForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
      ]
      ],
      'userName': [''],
      'codePostale': [''],
      'adress': ['', [
        Validators.minLength(10),
        Validators.required
      ]
    ],
      'phone': ['', [
        Validators.pattern('^(?=.+*[0-9])'),
        Validators.minLength(10),
        Validators.required
      ]]
    });

  }

  // Using getters will make your code look pretty
  get email() { return this.signupForm.get('email') }
  get password() { return this.signupForm.get('password') }

  get userName() { return this.signupForm.get('userName') }
  get codePostale() { return this.signupForm.get('codePostale') }
  get adress() { return this.signupForm.get('adress') }
  get phone() { return this.signupForm.get('phone') }


  // Step 1
  signup() {
    return this.auth.emailSignUp(this.email.value, this.password.value, this.signupForm.value);

  }

}
