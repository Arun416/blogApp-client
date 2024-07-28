import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { DashboardComponent } from './user/components/dashboard/dashboard.component';
import { RegisterComponent } from './auth/components/register/register.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import  {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BlogsComponent } from './user/components/blogs/blogs.component'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProfileComponent } from './user/components/profile/profile.component';
import { NavbarComponent } from './user/components/navbar/navbar.component';
import { CreateBlogComponent } from './user/components/create-blog/create-blog.component';
import { BlogDetailComponent } from './user/components/blog-detail/blog-detail.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { StripHtmlPipe } from './users_module/strip-html.pipe';
import { ErrorInterceptorInterceptor } from './error-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
