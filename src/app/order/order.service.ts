import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl="http://localhost:8082/orders"

  constructor(private http:HttpClient) { }

  getAllActiveOrders():Observable<Order []>{
    return this.http.get<Order []>(this.baseUrl+"/active");
  }

  getOrderById(id:number):Observable<Order>{
    return this.http.get<Order>(this.baseUrl+"/"+id)
  }

  saveOrder(order:Order){
    return this.http.post(this.baseUrl,order);
  }

  closeOrder(id:number){
    return this.http.get(this.baseUrl+"/save/"+id);
  }

}
