import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 /*  name = JSON.parse(sessionStorage.getItem("logginedInUser")!).name;
  userProfileImg = JSON.parse(sessionStorage.getItem("logginedInUser")!).picture;
  userEmail = JSON.parse(sessionStorage.getItem("logginedInUser")!).email;
  userId = JSON.parse(sessionStorage.getItem("logginedInUser")!).sub; */
  name = JSON.parse(sessionStorage.getItem("logginedInUser")!).username;
  userEmail = JSON.parse(sessionStorage.getItem("logginedInUser")!).email;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    
  }

  signOut(){
    sessionStorage.removeItem("logginedInUser");
     this.auth.signOut();
  }

}
