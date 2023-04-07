import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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
}
