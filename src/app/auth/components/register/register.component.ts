import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
declare var google:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit,AfterViewInit {
  signupFormGroup!:FormGroup
  submitted:boolean = false;
  isLoading:boolean = false;
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.signupFormGroup = this.fb.group({
      username:['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: '781838992698-39pscdt7dr64ej97qea5jnugm320maa7.apps.googleusercontent.com',
      callback:(res:any)=> this.handleLogin(res)
    })

    google.accounts.id.renderButton(document.getElementById("google-btn"),{
      theme:'filled_blue',
      type:'standard',
      size:'large',
      shape:'rectangular',
      width:300
    })
  }

  private decodeToken(token:string){
    return JSON.parse(atob(token.split(".")[1]));
  }

  handleLogin(response:any){
    if(response){
      //decode token
      const payload = this.decodeToken(response.credential);
      //store token
      sessionStorage.setItem('logginedInUser',JSON.stringify(payload));

      this.router.navigate(['/user/blogs']);
    }
  }


  get f() {
    return this.signupFormGroup.controls;
  }

  onSubmitSignup(form:any){
    this.submitted = true;
    this.isLoading = true;

    if(this.signupFormGroup.invalid){
      this.isLoading = false;
      return ;
      
    }
    console.log(form);
    this.auth.signUp(form).subscribe({
      next:(resp:any)=>{
      if(resp){
        this.router.navigate(['/auth/login']);
        this.isLoading = false;
      }
      },
      error:err=>{
        this.isLoading = false;
      }})
    this.signupFormGroup.reset();
   
  }

}
