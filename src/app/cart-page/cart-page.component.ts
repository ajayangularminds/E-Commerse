import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { PriceSummary, cart } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartData:cart[] | undefined;
  priceSummary:PriceSummary={
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  constructor(private productService:ProductService, private router:Router) { }

  ngOnInit(): void {
  
    this.loadDetails();

  }

  loadDetails(){
    this.productService.currentCart().subscribe((result)=>{
      this.cartData = result;
      let price = 0;
      result.forEach((item)=>{
       if(item.quantity){
         price = price+ (+item.productPrice * + item.quantity)
       }
       });
       
      this.priceSummary.price = price;
      this.priceSummary.discount = ((price)*30/100);
      this.priceSummary.tax = price/10;
      this.priceSummary.delivery = 40;
      this.priceSummary.total = price-((price)*30/100)+(price/10)+40;
     
      if(!this.cartData.length){
        this.router.navigate(['/']);
      }
     })
  }

  checkout(){
    this.router.navigate(['/checkout'])
  }

  removeToCart(cartId:number | undefined){

    cartId && this.cartData && this.productService.removeToCart(cartId).subscribe((result)=>{
     this.loadDetails();
    });

  }

}
