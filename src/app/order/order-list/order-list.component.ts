import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orderlist:Order[];

  constructor(private orderServcie:OrderService,
    private route:Router) { }

  ngOnInit() {
    this.orderServcie.getAllActiveOrders()
    .subscribe(data=>this.orderlist=data);
  }

  showOrder(id:number){
  this.route.navigate(['order/edit',id])
  }

  createOrder(){
    this.route.navigate(["order/new"]);
  }

}
