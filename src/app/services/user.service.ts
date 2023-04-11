import { EventEmitter, Injectable } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false);
  constructor(private http:HttpClient, private router:Router) { }

  userSignUp(data:SignUp){
    let url='http://localhost:3000/users';
      this.http.post(url,data,{ observe: 'response'}).
      subscribe((result)=>{
        console.log(result);
        if(result){
          localStorage.setItem('user',JSON.stringify(result.body));
          this.router.navigate(['/']);
        }
      })
  }

  userLogin(data:Login){
    let url=`http://localhost:3000/users?email=${data.email}&&password=${data.password}`
    this.http.get<SignUp[]>(url,{observe:'response'}).subscribe((result)=>{
     if(result && result.body?.length){
      this.invalidUserAuth.emit(false);
      console.log(result.body[0])
      localStorage.setItem('user',JSON.stringify(result.body[0]));
      this.router.navigate(['/']);
     }
     else{
        this.invalidUserAuth.emit(true);
     }
    });

  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }

  buyNow(){
    alert('Buy Now Works');
  }
}
