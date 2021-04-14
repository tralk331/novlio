import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from '../../../interfaces/User'
import {UserService} from '../user/user.service'
import {AngularFirestore} from '@angular/fire/firestore'
import { of} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  //List of all the series
  //TODO: cache results for some time to optimize use of database
  seriesList$: Observable<any[] | null>
  constructor(private userService: UserService, private aFirestore: AngularFirestore) 
  {
    this.seriesList$ = of(null);
    this.userService.user$.subscribe(
      (user: User) => {
        if(user.series){
          this.seriesList$ = aFirestore.collection('series', ref=> ref.where('owner', '==', user.uid)).valueChanges()
        } else this.seriesList$ = of(null);
      },
      err => this.seriesList$ = of(null),
      () => this.seriesList$ = of(null)
    );
  }
}
