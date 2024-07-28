import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  auth_token = sessionStorage.getItem("access-token");

  constructor(private http:HttpClient) { }

  getBlogs(){
    var reqHeader = new HttpHeaders({ 
      'Authorization': 'Bearer '+ this.auth_token
   });
    return this.http.get(environment.apiURL+"blog/all",{headers:reqHeader})
  }


  getMyBlogs(userId:string,order: string, page: number, limit: number){
    var reqHeader = new HttpHeaders({ 
      'Authorization': 'Bearer '+ this.auth_token
   });

   let params = new HttpParams();
  //  params = params.append("sortBy",'createdAt');
   params = params.append("order", order);
   params = params.append("page", page.toString());
   params = params.append("limit", limit.toString());
   
    return this.http.get(environment.apiURL+"blog/myblogs/"+userId,{params: params,headers:reqHeader})
  }

  getBlogDetail(blogId:string){
    var reqHeader = new HttpHeaders({ 
      'Authorization': 'Bearer '+ this.auth_token
   });
    return this.http.get(environment.apiURL+"blog/"+blogId,{headers:reqHeader})
  }

  createBlog(blogForm:any,blogImage:File){
    const formData = new FormData();
    formData.append('title',blogForm.title);
    formData.append('content',blogForm.content)
    formData.append('image',blogImage)

    var reqHeader = new HttpHeaders({ 
      'Authorization': 'Bearer '+ this.auth_token
   });
   return this.http.post(environment.apiURL+"blog/create",formData,{headers:reqHeader})
  }

  updateBlog(blogForm:any,blogId:string){
    var reqHeader = new HttpHeaders({ 
      'Authorization': 'Bearer '+ this.auth_token
   });
   return this.http.patch(environment.apiURL+"blog/edit/"+blogId,blogForm,{headers:reqHeader})
  }

  deleteBlog(blogId:string){
    var reqHeader = new HttpHeaders({ 
      'Authorization': 'Bearer '+ this.auth_token
   });
   return this.http.delete(environment.apiURL+"blog/edit/"+blogId,{headers:reqHeader})
  }


}
