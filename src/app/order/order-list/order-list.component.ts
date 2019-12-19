import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { faEye,faPlus,faSearch } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-order-list',
  
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  listData: MatTableDataSource<Order>;
  displayedColumns = ['id','date','action'];
  faEye=faEye;
  faPlus=faPlus;
  faSearch=faSearch;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort:MatSort;

  constructor(private orderServcie:OrderService,
    private route:Router) { }

  ngOnInit() {
    this.orderServcie.getAllActiveOrders().subscribe((data)=>this.listData=new MatTableDataSource<Order>(data));
    setTimeout(() =>this.listData.sort=this.sort);
    setTimeout(() => this.listData.paginator=this.paginator);
  }

  showOrder(id:number){
  this.route.navigate(['order/edit',id])
  }

  createOrder(){
    this.route.navigate(["order/new"]);
  }

  applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLowerCase();
  }

}
