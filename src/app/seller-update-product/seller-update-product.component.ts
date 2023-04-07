import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  productData: undefined | Product;
  updateProductMessage: undefined | string;

  constructor(private route:ActivatedRoute,private productService:ProductService) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    productId && this.productService.getProduct(productId).subscribe((data:Product)=>{
      console.log(data);
      this.productData=data;
    })
  }


  updatePro(data:Product){
      console.log(data);
      if(this.productData){
        data.id=this.productData.id;
      }
      this.productService.updateProduct(data).subscribe((result)=>{
        if(result){
          this.updateProductMessage = "Product Has Been Updated"
        }
      });

      setTimeout(()=>{
        this.updateProductMessage = undefined;
      },3000)
  }
}
