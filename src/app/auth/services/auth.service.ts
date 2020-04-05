import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NotificationsService } from './notifications.service';
import { User } from './models/user';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  user = new BehaviorSubject<User | null>(this.getUser);

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private notificationsService: NotificationsService
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });

    // this.afAuth.onAuthStateChanged((user) => {
    //   if (user) {
    //     this.user.next(user);
    //   } else {
    //     this.user.next(null);
    //   }
    // });
  }

  get getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  // Sign in with email/password
  SignIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
      })
      .then(() => {
        this.ngZone.run(() => {
          this.router.navigate(['user']);
        });
      })
      .catch((error) => {
        this.notificationsService.warn(error.message);
      });
  }


   // Sign up with email/password
   SignUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
      })
      .then(() => {
        this.router.navigate(['user']);
      })
      .catch((error) => {
        this.notificationsService.warn(error.message);
      });
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        this.SetUserData(result.user);
      })
      .then(() => {
        this.ngZone.run(() => {
          this.router.navigate(['user']);
        });
      })
      .catch((error) => {
        // this.user.next(null);
        this.notificationsService.error(error.message);
      });
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      adress: user.adress,
      phone: user.phone,
      roles: user.roles,
      updateDate: user.updateDate
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign out
  SignOut() {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['auth']);
    });
  }
  
  

  //// Role-based Authorization //////

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'reader']
    return this.checkAuthorization(user, allowed)
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor']
    return this.checkAuthorization(user, allowed)
  }

  canDelete(user: User): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }



  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true
      }
    }
    return false
  }


}
