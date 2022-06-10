import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { ToastService } from "angular-toastify"
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  constructor(private toast: ToastService,private formbuilder: FormBuilder, private authService : AuthserviceService,private router: Router) { }
  signInForm!: FormGroup;
  ngOnInit(): void {
      if(this.authService.isLoggedIn() ===  true){
        this.router.navigate(['/main'])
      }
    this.signInForm = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSignin(){
     if(this.signInForm.valid ){
          this.authService.signIn(this.signInForm.value).subscribe((res)=>{
            localStorage.setItem("username",res.displayName)
            localStorage.setItem("userid",res.localId)
            localStorage.setItem("token",res.idToken)
            this.authService.loginSubject.next(true);
            this.toast.success('Succefully LoggedIn')
            this.router.navigate(['/main'])
         },(err)=>{
          this.toast.error(err.error.error.message)
        })
      }else{
          this.toast.warn("Please Fill Every Fields")
      }
      }
}
