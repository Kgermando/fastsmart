import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth/auth.service';
import { CartService } from '../shared/services/data/cart.service';
import { ShoppingCart } from '../shared/models/shopping-cart';
import { AppUser } from '../auth/services/models/app-user';

@Component({
  selector: 'app-fast-smart',
  templateUrl: './fast-smart.component.html',
  styleUrls: ['./fast-smart.component.scss']
})
export class FastSmartComponent implements OnInit {

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  loggedIn$: Observable<boolean>;
  loggedOut$: Observable<boolean>;
  
  
  isActive = true;
  searchTerm = '';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    public authService: AuthService,
    private cartService: CartService
  ) {}

  async ngOnInit() {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
      this.cart$ = await this.cartService.getCart();
    
    this.loggedIn$ = this.afAuth.authState.pipe(
      map(user => !!user)
    );
    this.loggedOut$ = this.loggedIn$.pipe(
      map(loggedIn => !loggedIn)
    );


  }

  async signOut() {
    await this.afAuth.signOut()
    await localStorage.clear();
    await this.router.navigateByUrl("/fastsmart/auth")
  }

}
