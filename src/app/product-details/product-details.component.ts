import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product, cart } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | Product;
  currentColor: string = '';
  cartData: Product | undefined;

  productQuantity: number = 1;
  quantity: number = 1;

  removeCart = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
    private router:Router
  ) {}

  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    productId &&
      this.productService.getProduct(productId).subscribe((data) => {
        console.log(data);
        this.currentColor = data.productColor;
        this.productData = data;

        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: Product) => productId === item.id.toString()
          );
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }

        let user = localStorage.getItem('user');
        console.log('User From Product Details Component', user);
        if (user) {
          let userId = user && JSON.parse(user).id;
          this.productService.getCartList(userId);
          this.productService.cartData.subscribe((result) => {
            console.log(result);
            let item = result.filter((item: Product) =>productId?.toString() === item.productId?.toString());
            if (item.length) {
              this.cartData = item[0];
              this.removeCart = true;
            }
          });
        }
      });
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity++;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity--;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;

        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        delete cartData.id;
        this.productService.addToCart(cartData).subscribe((result) => {
          if (result) {
            alert('Product Added In The Cart');
            this.productService.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }

  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.productService.removeItemFromCart(productId);
    }
     else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        console.log(this.cartData);
        this.cartData && this.productService.removeToCart(this.cartData.id).subscribe((result)=>{
            if(result){
              this.productService.getCartList(userId)
            }
        })
    }
    this.removeCart = false;
  }

  buyNow(){
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;

        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        delete cartData.id;
        this.productService.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.productService.getCartList(userId);
            this.removeCart = true;
            this.router.navigate(['cart-page'])
          }
        });
      }
    }
  }
}
