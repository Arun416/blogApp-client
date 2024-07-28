import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userEmail = JSON.parse(sessionStorage.getItem("logginedInUser")!).email;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  items: string[] = [
    'The first choice!',
    'And another choice for you.',
    'but wait! A third!'
  ];
 
  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }

  signOut(){
    sessionStorage.removeItem("logginedInUser");
    sessionStorage.removeItem("access-token");
    // this.auth.signOut();
    this.router.navigate(['/auth/login'])
  }
}
