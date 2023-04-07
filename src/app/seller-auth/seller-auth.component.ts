import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private sellerService: SellerService,private router:Router) { }

  authError:string="";

  showLogin:boolean = false;
  ngOnInit(): void {
    this.sellerService.reloadSeller();
  }

  signUp(data:SignUp){
   this.sellerService.userSignUp(data)
  }

  openLogin(){
    this.showLogin=false;
  }

  openSignUp(){
    this.showLogin=true;
  }

  login(data:SignUp){
      console.log(data);
      this.authError = "";
      this.sellerService.userLogin(data);
      this.sellerService.isLoginErr.subscribe((isError)=>{
        if(isError){
          this.authError = "Email or Password Is Not Correct"
        }
      })
  }
}
