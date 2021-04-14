import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/data/user/user.service';
import {Router, RouteReuseStrategy} from '@angular/router'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (!this.userService.user$){
      this.router.navigate(['/home'])
    }
  }

}
