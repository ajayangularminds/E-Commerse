import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Order, cart } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice:number|undefined;
  cartData:cart[]|undefined;
  orderMsg : string | undefined;

  constructor(private productService: ProductService,private router:Router) { }

  ngOnInit(): void {
    this.productService.currentCart().subscribe((result)=>{
      let price = 0;
      this.cartData = result;
      result.forEach((item)=>{
       if(item.quantity){
         price = price+ (+item.productPrice * + item.quantity)
       }
       });
       
       this.totalPrice = price-((price)*30/100)+(price/10)+40;
       console.log(this.totalPrice);
     })
  }

  checkout(data:{email:string,address:string,contactNo:string}){
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if(this.totalPrice){
      let orderData:Order={
        ...data,
        totalPrice : this.totalPrice,
        userId,
        id:undefined,
      }

      this.cartData?.forEach((item)=>{
        setTimeout(()=>{
          item.id && this.productService.deleteCartItems(item.id);
        },1000)
      })

      this.productService.orderNow(orderData).subscribe((result)=>{
        
        if(result){
          this.orderMsg = "Your Order Has Been Placed..."
          console.log(result);

          setTimeout(()=>{
            this.router.navigate(['/my-orders']);
            this.orderMsg = undefined;
          },1000)

          
        }
      })
    }
    
  }
}
