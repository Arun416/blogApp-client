import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  auth_token:any;
  
  constructor(private http:HttpClient) { }

   //profile Info
   getProfile(userId: string): Observable<any> {
    this.auth_token = sessionStorage.getItem("access-token")
    var reqHeader = new HttpHeaders({ 
      'Authorization': 'Bearer '+ this.auth_token
   });
    return this.http.get(environment.apiURL+"profile/"+userId,{headers:reqHeader});
  }
  
  updateProfile(userId: string,userForm:any,img:any){
    this.auth_token = sessionStorage.getItem("access-token")

    const formData = new FormData();
    formData.append('first_Name',userForm.first_Name);
    formData.append('last_Name',userForm.last_Name);
    formData.append('email',userForm.email);
    formData.append('mobile_No',userForm.mobile_No);
    formData.append('dob',userForm.dob);
    formData.append('country',userForm.country);
    formData.append('bio',userForm.bio);
    formData.append('profile_picture',img);
    console.log(img,"send Url");
    
    var reqHeader = new HttpHeaders({ 
      'Authorization': 'Bearer '+ this.auth_token
   });

    return this.http.patch(environment.apiURL+"profile/edit/"+userId,formData,{headers:reqHeader});
  }
}
