import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
   {path:'dashboard',component:DashboardComponent},
   {path:'blogs',component:BlogsComponent ,canActivate: [AuthGuard],},
   {path:'blog/detail/:id',component:BlogDetailComponent},
   {path:'profile',component:ProfileComponent},
   {path:'create',component:CreateBlogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
