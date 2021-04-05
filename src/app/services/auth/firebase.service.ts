import { Injectable } from "@angular/core";
import firebase from 'firebase/app';
import 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/auth'
import {AngularFirestore,AngularFirestoreDocument} from '@angular/fire/firestore'
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../../interfaces/User'
@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    constructor(
        private firebaseAuth: AngularFireAuth,
        private aFirestore: AngularFirestore,
        private router: Router
    ){
    }
    async googleSignIn() {
        const credential = await this.firebaseAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        this.createUserData(credential.user);
        this.router.navigate(['/home'])
    }
    private createUserData(user) {
        const userDocument: AngularFirestoreDocument<User> = this.aFirestore.collection("users").doc(user.uid);
        const data = {
            uid: user.uid,
            name: user.displayName
        }
        userDocument.set(data, {merge: true});
    }
    async signIn(email: string, password: string){
        await this.firebaseAuth.signInWithEmailAndPassword(email, password)
        .then(res => {
            localStorage.setItem('user', JSON.stringify(res.user))
        })
    }
    async signUp(email: string, password: string){
        await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
        .then(res => {
            localStorage.setItem('user', JSON.stringify(res.user))
        })
    }
    async logOut() {
        console.log("sadffad")
        this.firebaseAuth.signOut()
        this.router.navigate(['/auth'])
    }
   
} 