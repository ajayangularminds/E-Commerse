import { Component, OnInit } from '@angular/core';
import { SellerService } from './services/seller.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eCommerse';

  constructor(private http:HttpClient){
    
  }

}
