import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/auth/firebase.service'
import { UserService } from '../services/data/user.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private firebaseService: FirebaseService,
    public userService: UserService,
    private router: Router
  ){}
  onSignIn(): void {
    this.firebaseService.googleSignIn();
  }
  onDashboard(): void {
    this.router.navigate(['/dashboard'])
  }
}
