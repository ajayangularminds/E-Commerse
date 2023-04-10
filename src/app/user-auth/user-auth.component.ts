import { Component, OnInit } from '@angular/core';
import { Login, Product, SignUp, cart } from '../data-type';
import { UserService } from '../services/user.service';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;

  authError: string = '';

  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.userService.userAuthReload();
  }

  signUp(data: SignUp) {
    this.userService.userSignUp(data);
  }

  userLog(data: Login) {
    this.userService.userLogin(data);
    this.userService.invalidUserAuth.subscribe((result) => {
      console.log(result);
      if (result) {
        this.authError = 'User Not Found';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true;
  }

  localCartToRemoteCart() {

    setTimeout(()=>{

      let data = localStorage.getItem('localCart');
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
  
      if(data) {
        let cartDataList: Product[] = JSON.parse(data);
  
        cartDataList.forEach((product: Product, index) => {
          let cartData: cart = {
            ...product,
            productId: product.id,
            userId,
          };
          delete cartData.id;
  
          setTimeout(() => {
            this.productService.addToCart(cartData).subscribe((result) => {
              if(result) {
                console.log('Item Stored In DataBase');
              }
            });
            if(cartDataList.length === index + 1) {
              localStorage.removeItem('localCart');
            }
          }, 500);
        });
      }
  
      setTimeout(() => {
        this.productService.getCartList(userId);
      }, 500);
      
    },500)

   
  }
}
