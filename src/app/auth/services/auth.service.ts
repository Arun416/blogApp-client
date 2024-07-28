import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
declare var google:any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth_token:any;

  constructor(private router:Router,private http:HttpClient) { }

  signUp(userForm: any){
    return this.http.post(environment.apiURL+"signup",userForm);
  }

  login(userForm: any){
    return this.http.post(environment.apiURL+"login",userForm);
  }

  signOut(){
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/'])
  }


 
}
