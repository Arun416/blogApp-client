import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/user/services/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  id = JSON.parse(sessionStorage.getItem("logginedInUser")!)._id;
  name = JSON.parse(sessionStorage.getItem("logginedInUser")!).username;
  blogInfo:any;
  blogTitlePicture:any;

  constructor(
    private router:Router,
    private blogServ:BlogService) { }
 
  ngOnInit(): void {
    this.getMyBlogs();
   
  }
 
  getMyBlogs(){

    this.blogServ.getBlogs().subscribe(res=>{
      console.log(res);
      
    })

    this.blogServ.getMyBlogs(this.id).subscribe((res:any)=>{
      console.log(res);
      this.blogInfo = res
      this.convertPlaintext()
    })
  }
  plainContent:any;
  convertPlaintext(){
      for(let i=0;i< this.blogInfo.data.length;i++){
        this.plainContent =  this.blogInfo.data[i].content.replace(/<[^>]*>/g, '');
        console.log(this.plainContent);
        
      }
      
  }

}
