import { Component, Input, OnInit } from '@angular/core';
import { FirebaseService } from '../services/auth/firebase.service';
import { UserService } from '../services/data/user.service';
import {UserAuth} from '../UserAuth'
@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  
  constructor(
    private firebaseService: FirebaseService,
    public userService: UserService
  ) { }
  onGoogle(): void {
    this.firebaseService.googleSignIn();
  }
  ngOnInit(): void {
  }

}
