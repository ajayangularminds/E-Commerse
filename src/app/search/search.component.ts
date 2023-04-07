import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  searchResult: undefined | Product[];

  constructor(private activatedRoute:ActivatedRoute, private productService:ProductService) {
    this.load();
  }

  ngOnInit(): void {
    this.load();
  }

  load(){
    let query = this.activatedRoute.snapshot.paramMap.get('query');
    console.log(query);
    query && this.productService.searchProducts(query).subscribe((data) => {
     this.searchResult = data;
     console.log(data);
    })
  }

}
