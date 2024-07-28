import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  isLoginCheck(){
    if(!sessionStorage.getItem('access-token')){
      this.router.navigate(['/auth/login'])
    }
    else {
      this.router.navigate(['/user/create'])
    }
  }
}
