import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  blogId!:string;
  blogDetails:any;
  constructor(
    public router:Router,
    private bls:BlogService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id') || ''
    this.getBlogDetails();
  }

  getBlogDetails(){
    
    this.bls.getBlogDetail(this.blogId).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.blogDetails = res.data[0];
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

}
