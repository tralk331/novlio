import { Component, Input, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { SeriesService } from 'src/app/services/data/series/series.service';
import { take } from 'rxjs/operators'
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

  @Input() newSeriesData: Series = {
    title: "",
    description: "",
    owner: ""
  }
  isPopup: boolean = false
  constructor(public seriesService: SeriesService, private userService: UserService, private aFirestore: AngularFirestore) {
  }
  ngOnInit(): void {}
  onToggleAddSeries(): void {
    this.isPopup = !this.isPopup
  }
  onSubmitSeries(formData: NgForm): void {
    if (!formData.valid) return
    //Get user data
    this.userService.user$.pipe(take(1)).subscribe(user => {
      //Create document with the data, and set the owner to the user's id
      this.aFirestore.collection("series").add({...formData.value,owner: user.uid}).then(document => {
        //After creating the document, update the user's list of series with the document id
        this.aFirestore.collection("users").doc(user.uid).update({
          series: firebase.firestore.FieldValue.arrayUnion(document.id)
        }).then(() => this.onToggleAddSeries())
      });
    })
  }
}
