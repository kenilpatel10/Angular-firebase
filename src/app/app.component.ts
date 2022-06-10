import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from './services/authservice.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular_firebase';
isLogIn: any
userData: any
  constructor(public authservice: AuthserviceService,private router: Router){

  }
  ngOnInit():void{
    this.isLogIn= this.authservice.isLoggedIn()
    this.authservice.loginSubject.asObservable().subscribe((res)=>{
      this.isLogIn= this.authservice.isLoggedIn()
      console.log('first',this.isLogIn)

    })

  


  }

logOut(){
  this.authservice.loginSubject.next(false);
  localStorage.clear()
 
  this.router.navigate(['/'])
  window.location.reload()
}

}
