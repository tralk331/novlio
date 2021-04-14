import { Component, OnInit } from '@angular/core';
import { SeriesService } from 'src/app/services/data/series/series.service';
import {take} from 'rxjs/operators'
import {forkJoin} from 'rxjs'
import { UserService } from 'src/app/services/data/user/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import {Series} from '../../interfaces/Series'
import firebase  from 'firebase/app';
@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  constructor(public seriesService: SeriesService, private userService: UserService, private aFirestore: AngularFirestore) {
    
  }

  ngOnInit(): void {
    
  }
  onAddSeries(): void {
    this.userService.user$.pipe(take(1)).subscribe(user => {
      const data: Series = {
        name: "Test",
        owner: user.uid
      }
      this.aFirestore.collection("series").add(data).then(document => {
        this.aFirestore.collection("users").doc(user.uid).update({
          series: firebase.firestore.FieldValue.arrayUnion(document.id)
        })
      });

    })
    //this.seriesService.createSeries();
  }
}
