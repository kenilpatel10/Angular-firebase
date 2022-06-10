import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { ToastService } from "angular-toastify"
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private toast: ToastService,private formbuilder: FormBuilder, private authService : AuthserviceService,private router: Router) { }
  signUpForm!: FormGroup;

  ngOnInit(): void {

    this.signUpForm = this.formbuilder.group({
      displayName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    });
  }
  same: any
  onSignup(){
 this.same= this.signUpForm.value.password === this.signUpForm.value.confirmpassword
if(this.signUpForm.valid && this.signUpForm.value.password !== this.signUpForm.value.confirmpassword){
  this.toast.error("Passwor didn't match")
}
  else if(this.signUpForm.valid && this.signUpForm.value.password === this.signUpForm.value.confirmpassword){
      this.authService.signUp(this.signUpForm.value).subscribe((res)=>{
        console.log("res",res)
        this.toast.success('Succefully Registered')
        this.router.navigate(['/'])
     },(err)=>{
      this.toast.error(err.error.error.message)
    })
  }else{
      this.toast.warn("Please Fill Every Fields")
  }
  }

}
