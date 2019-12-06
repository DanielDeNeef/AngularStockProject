import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:Product[];
  product=new Product();

  constructor(private productService:ProductService,private router:Router) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(data=>this.products=data);
  }

  deleteProduct(prod:Product){
   
      this.productService.deleteProduct(prod)
      .subscribe((data)=>
      {
        this.products.splice(this.products.indexOf(prod),1);
      });      
  }

  showProduct(prod:Product){
    
    if(prod.prodId>0){
      
      this.productService.setProduct(prod);
      this.router.navigate(["/showProduct"]);

    }else{
      alert(prod);
      this.productService.setProduct(new Product())
      this.router.navigate(["/showProduct"]);
    }
  }

  productsLenght(){
    return this.products.length;
  }

}
