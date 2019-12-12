import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product:Product;

  constructor(private productService:ProductService,private route:Router) { }

  ngOnInit() {
    this.product=this.productService.getProduct();
  }

  saveProduct(){     
      this.productService.createProduct(this.product).subscribe((data)=>console.log(data));
      this.route.navigate(['/products']);
    }
}
