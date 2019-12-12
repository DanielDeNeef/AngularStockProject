import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string  = "http://localhost:8080/products";
  product:Product={
    prodId:null,
    prodDescription:'',
    prodMeasure:'',
    prodQuantity:null,
    prodPictureUrl:''
  };


  constructor(private http:HttpClient) { }

  getAllProducts():Observable<Product[]>{
      return this.http.get<Product[]>(this.baseUrl);
  }

  getSingleProduct(prod : Product):Observable<Product>{
      return this.http.get<Product>(this.baseUrl+"/"+prod.prodId);
  }

  createProduct(prod:Product){
    return this.http.post(this.baseUrl,prod);
  }

  deleteProduct(prod:Product):Observable<Product>{
    return this.http.delete<Product>(this.baseUrl+"/"+prod.prodId);
  }

  getProduct(){
    return this.product;
  }

  searchProduct(search:String):Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+"/search/"+search);
  }

  setProduct(prod:Product){
    if(prod.prodId==undefined){
      prod.prodId=null;
    }
    this.product = prod;
  }

}
