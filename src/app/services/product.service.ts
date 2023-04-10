import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Order, Product, cart } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<Product[] | []>();
  constructor(private http:HttpClient) { }

  addProduct(data:Product){
    return this.http.post('http://localhost:3000/products',data)
  }

  productList(){
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  deleteProduct(id:number){
    let url = `http://localhost:3000/products/${id}`
    return this.http.delete(url);
  }

  getProduct(id:string){
    let url = `http://localhost:3000/products/${id}`
    return this.http.get<Product>(url)
  }

  updateProduct(product:Product){
    let url = `http://localhost:3000/products/${product.id}`
       return this.http.put<Product>(url,product);
  }

  populaProducts(){
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=3');
  }

  trendyProducts(){
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=8');
  }

  searchProducts(query:string){
    return this.http.get<Product[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddToCart(data:Product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([data]))
      this.cartData.emit([data]);
    }
    else{
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId:number){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      let items:Product[] = JSON.parse(cartData);
      items = items.filter((item:Product) =>productId !== item.id)
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData:cart){
    return this.http.post('http://localhost:3000/cart',cartData)
  }

  getCartList(userId:number){
    return this.http.get<Product[]>('http://localhost:3000/cart?userId='+userId,{observe:'response'}).subscribe((result)=>{
      if(result && result.body){
        this.cartData.emit(result.body);
      }
    });
  }

  removeToCart(cartId:number){
    return this.http.delete('http://localhost:3000/cart/'+cartId);
  }

  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);

    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userData.id)
  }

  orderNow(data:Order){
      return this.http.post('http://localhost:3000/orders',data)
  }

  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Order[]>('http://localhost:3000/orders?userId='+userData.id)
  }

  deleteCartItems(cartId:number){
    this.http.delete('http://localhost:3000/cart/'+cartId,{observe:'response'}).subscribe((result)=>{
    if(result){
      this.cartData.emit([]);
      console.log(result);
    }  
    })
  }

  cancelOrder(orderId:number){
      return this.http.delete('http://localhost:3000/orders/'+orderId);
  }

}
