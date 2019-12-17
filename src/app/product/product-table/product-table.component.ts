import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { faEye,faTrash,faPlus } from "@fortawesome/free-solid-svg-icons";
import { Router } from '@angular/router';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {

  listData: MatTableDataSource<Product>;
  displayedColumns = ['prodId','prodDescription','prodQuantity','prodMeasure','prodPictureUrl','action','Search'];
  product:Product={
    prodId:null
  }
  faEye=faEye;
  faTrash=faTrash;
  faPlus=faPlus;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort:MatSort;

  constructor(private productService:ProductService,private router:Router){}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(data=>this.listData=new MatTableDataSource<Product>(data));
    setTimeout(() =>this.listData.sort=this.sort);
    setTimeout(() => this.listData.paginator=this.paginator);
  }

  showProduct(prod:Product){
    
    if(prod.prodId>0){
      
      this.productService.setProduct(prod);
      this.router.navigate(["/showProduct"]);

    }else{
      this.productService.setProduct(new Product())
      this.router.navigate(["/showProduct"]);
    }
  }
}
