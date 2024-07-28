import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userID:any;
  userProfile:any;
  userProfilePic:any;
  profileFormGroup!:FormGroup;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  imageSrc: any = 'https://img.freepik.com/premium-vector/avatar-profile-picture-icon-blue-background-flat-design-style-resources-graphic-element-design_991720-653.jpg?w=740'; // Default image source
  selectedFile!: File ;
  profilepicData:any;

  constructor(
    private profileService:ProfileService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateProfileForm()
    this.getProfileInfo();
    
  }

  onImageClick(): void {
    this.fileInput.nativeElement.click(); // Trigger click on file input
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


  updateProfileForm(){
    this.profileFormGroup = this.fb.group({
      first_Name: "",
      last_Name: "",
      email: "",
      mobile_No: "",
      dob: "",
      country: "",
      bio:"",
    })

   
  }

  getProfileInfo(){
    this.userID = JSON.parse(sessionStorage.getItem("logginedInUser")!)._id
    this.profileService.getProfile(this.userID).subscribe((res:any)=>{
        console.log(res);
        this.userProfile = res?.data[0];
        this.userProfilePic = "http://localhost:5000"+this.userProfile.profile_picture;
        this.imageSrc = this.userProfilePic !==""||null ? this.userProfilePic : this.imageSrc;
        this.profilepicData  = {
          profile_picture : null
        }
        this.profilepicData.profile_picture = this.userProfile.profile_picture
        
        this.profileFormGroup.patchValue({
          first_Name: this.userProfile.first_Name,
          last_Name:  this.userProfile.last_Name,
          email: this.userProfile.email,
          mobile_No: this.userProfile.mobile_No,
          dob: this.formatDate(this.userProfile.dob),
          country: this.userProfile.country,
          bio: this.userProfile.bio,
        })

    })
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }


  onEditProfile(form:any){
    this.userID = JSON.parse(sessionStorage.getItem("logginedInUser")!)._id

   if(this.selectedFile){
      this.profilepicData.profile_picture = this.selectedFile
      this.profileService.updateProfile(this.userID,form,this.profilepicData.profile_picture).subscribe((res:any)=>{
        alert(res.message)
        this.getProfileInfo()
      })
   }
   else {
    console.log(this.profilepicData.profile_picture,"img");
      this.profileService.updateProfile(this.userID,form,this.profilepicData.profile_picture).subscribe((res:any)=>{
        alert(res.message)
        this.getProfileInfo()
      })
   }
  }

}
