import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productList:undefined | Product[];
  productMessage: undefined | string;

  faCoffee = faCoffee;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id:number){
    console.log(id);
    this.productService.deleteProduct(id).subscribe((result)=>{
        if(result){
          this.productMessage = "Product Is Deleted Successfully"
          this.list();
        }
    })

    setTimeout(()=>{
      this.productMessage = undefined;
    },3000)
  }

  list(){
    this.productService.productList().subscribe((result)=>{
      console.log(result);
      this.productList=result;
    })
  }

}
