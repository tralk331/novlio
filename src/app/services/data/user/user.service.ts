import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import {AngularFirestore,AngularFirestoreDocument} from '@angular/fire/firestore'
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../../../interfaces/User'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: Observable<any>;
  constructor(
      private firebaseAuth: AngularFireAuth,
      private aFirestore: AngularFirestore,
  ){
      this.user$ = this.firebaseAuth.authState.pipe(
          switchMap(user => {
              if (user) return this.aFirestore.doc<User>(`users/${user.uid}`).valueChanges();
              else return of(null);
          })
      );
  }
}
