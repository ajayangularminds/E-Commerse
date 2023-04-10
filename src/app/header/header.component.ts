import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType:string = "default";
  sellerName:string = "";
  userName:string = "";

  searchResult:undefined | Product[];
  cartItems = 0;

  constructor(private router:Router, private productService:ProductService) { }

  ngOnInit(): void {
    
    this.router.events.subscribe((val:any) => {
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          this.menuType= "seller";
          if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        }
        else if(localStorage.getItem('user')){
         
          this.menuType="user";
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.username;
          console.log(userData);
          this.productService.getCartList(userData.id);
        }
        else{
          this.menuType= "default"
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }

    this.productService.cartData.subscribe((items)=>{
      this.cartItems = items.length;
    })
  }

  logout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  searchProduct(query:KeyboardEvent){
      if(query){
        const element = query.target as HTMLInputElement;
        this.productService.searchProducts(element.value).subscribe((result) =>{
          if(result.length>5){
            result.length=5;
          }
          this.searchResult = result;
        })
      }
  }

  hideSearch(){
    this.searchResult=undefined;
  }

  submitSearch(val:any){
    let url = `search/${val}`;
    this.router.navigate([url]);
  }

  redirectToDetails(productId:number){
      this.router.navigate(['details/'+productId])
  }

  userLogout(){

    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.productService.cartData.emit([]);
  }

}
