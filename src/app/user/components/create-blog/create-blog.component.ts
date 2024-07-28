import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Editor from 'ckeditor5-custom-build/build/ckeditor';
import Adapter from './ckeditorAdaptor';
import { BlogService } from 'src/app/user/services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {
  @ViewChild('blogImg', { static: false }) blogImg!: ElementRef;
  public Editor:any = Editor;
  ckconfig:any;
  blogFormGroup!:FormGroup;
  blogImage:any;
  selectedFile:any;
  imageSrc:string='';
  isLoading:boolean = false;
  submitted:boolean = false;

  public config = {
    placeholder:"Sample Blog Content..."
  }

  constructor(
    private fb:FormBuilder,
    private blogService:BlogService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.createBlogForm();
  }


  createBlogForm(){
    this.blogFormGroup = this.fb.group({
      title: ['',Validators.required],
      content: ['',Validators.required]
    })

    this.blogImage={
      image: null
    }
  }

  
  onReady(editor:any){
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader: any ) => {
    return new Adapter(loader, editor.config);;
  };
  
  }

  onImageupload(){
    this.blogImg.nativeElement.click();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result as string; // Update image source
      };
      reader.readAsDataURL(file); // Read file as data URL
    }
  }

  onRemoveupload(){
    this.blogImg.nativeElement.value = "";
    this.imageSrc = ""
  }

  get f() {
    return this.blogFormGroup.controls;
  }

  onCreateNew(post: any){
    this.isLoading = true;
    this.submitted = true;
    this.blogImage.image = this.selectedFile
    if(this.blogFormGroup.invalid){
      this.isLoading = false;
      return;
    }
    else {
      console.log(post);
      console.log(this.blogImage.image);
      this.blogService.createBlog(post,this.blogImage.image).subscribe(
        (res:any)=>{
        alert(res.message);
        this.isLoading = false;
        this.router.navigate(['/user/blogs']);
      }) 
    }
   
    
}
}
