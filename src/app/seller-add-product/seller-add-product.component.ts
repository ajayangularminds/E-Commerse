import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  addProductMessage:string | undefined = undefined;
  constructor(private productService:ProductService,private http:HttpClient) { 
  }

  ngOnInit(): void {
  }

  addPro(formValues:Product){
    console.log(formValues);
    this.productService.addProduct(formValues).subscribe((result)=>{
      if(result){
        this.addProductMessage = "Product Is Successfully Added"
      }
      setTimeout(()=>{this.addProductMessage=undefined},3000)
      console.log(result);
    });
  }
}
