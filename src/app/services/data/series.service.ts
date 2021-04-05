import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Series} from '../../interfaces/Series'
import {User} from '../../interfaces/User'
import { UserService } from './user.service';
import {AngularFirestore,AngularFirestoreDocument} from '@angular/fire/firestore'
import {combineLatest, of} from 'rxjs'
import {take} from 'rxjs/operators'
import firebase  from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  seriesList$: Observable<any[] | null>
  constructor(private userService: UserService, private aFirestore: AngularFirestore) 
  {
    this.seriesList$ = of(null);
    this.userService.user$.subscribe(
      (user: User) => {
        if(user.series){
          const seriesObjects = user.series.map(val => aFirestore.collection("series").doc(val).valueChanges())
          this.seriesList$ = combineLatest(seriesObjects)
        } else this.seriesList$ = of(null);
      },
      err => this.seriesList$ = of(null),
      () => this.seriesList$ = of(null)
    );
    console.log
  }
  createSeries(): void {
    this.userService.user$.pipe(take(1)).subscribe(user => {
      const data: Series = {
        name: "Valami",
        owner: user.uid
      }
      this.aFirestore.collection("series").add(data).then(document => {
        this.aFirestore.collection("users").doc(user.uid).update({
          series: firebase.firestore.FieldValue.arrayUnion(document.id)
        })
      });

    })
  }

}
