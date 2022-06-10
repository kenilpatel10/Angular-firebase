import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  constructor(private http: HttpClient) {}


public loginSubject = new Subject<boolean>();

 // logged in
isLoggedIn() {
  let tokenStr = localStorage.getItem('token')
  if(tokenStr == undefined || tokenStr == '' || tokenStr == null) {
    return false;
  } else {
    return true;
  }
}

  signUp(data: any) {
    return this.http.post<any>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkZJvG-a4XBooRcjAWN-WBKT-VeRKbv1g',
      data
    );
  }

  signIn(data: any) {
    return this.http.post<any>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkZJvG-a4XBooRcjAWN-WBKT-VeRKbv1g',
      data
    );
  }

  getUser(tokenId:any){
    return this.http.post<any>(
      " https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDkZJvG-a4XBooRcjAWN-WBKT-VeRKbv1g",tokenId
    )
   
  }
}
