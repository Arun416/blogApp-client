import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { StripHtmlPipe } from '../users_module/strip-html.pipe';


@NgModule({
  declarations: [
    CreateBlogComponent,
    BlogsComponent,
    NavbarComponent,
    BlogDetailComponent,
    ProfileComponent,
    StripHtmlPipe
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    BsDropdownModule.forRoot(),
  ]
})
export class UserModule { }
