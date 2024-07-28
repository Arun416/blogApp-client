declare var google:any;
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  /* animations: [
    trigger('toggleClick',[
      state('true',style({
        backgroundColor:'green'
      })),
      state('false',style({
        backgroundColor:'red'
      })),
      transition('true => false',animate('1000ms linear')),
      transition('false => true',animate('1000ms linear'))
    ]
  )
  ] */
})
export class LoginComponent implements OnInit,AfterViewInit  {
  isGreen: boolean = false;
  loginFormGroup!:FormGroup;
  submitted: boolean = false;
  isLoading:boolean = false;

  constructor(
    private router:Router,
    private fb:FormBuilder,
    private auth:AuthService) { }

  ngOnInit(): void {
   
    this.createForm()
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

  createForm(){
    this.loginFormGroup = this.fb.group({
      email: ["",Validators.required],
      password: ["",Validators.required]
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

 /*  toggleIsCorrect() {
    this.isGreen = this.isGreen === true ? false : true; // change in data-bound value
  } */

  get f() {
    return this.loginFormGroup.controls;
  }

  onLogin(form: any){
    this.submitted = true;
    this.isLoading = true;
    if(this.loginFormGroup.invalid){
      this.isLoading = false;
      return ;
     
    }
    this.auth.login(form).subscribe({
      next:(resp:any)=>{
      if(resp){
        sessionStorage.setItem('access-token',resp.token);
        const payload = this.decodeToken(resp.token);
        sessionStorage.setItem('logginedInUser',JSON.stringify(payload));
        this.isLoading = false;
        this.router.navigate(['/user/blogs'])
      }
      },
      error:err=>{
        alert(err)
        console.log(err);
        this.isLoading = false;
      }})
  }
}
