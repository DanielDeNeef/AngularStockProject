import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Menu } from 'src/app/menu/menu';
import { MenuService } from 'src/app/menu/menu.service';
import { Order } from '../order';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { OrderdMenuList } from '../order-menu-list';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  orderForm:FormGroup;
  listOfItems:Menu[];
  order:Order;

  constructor(private fb:FormBuilder,
    private menuServcie:MenuService,
    private route:ActivatedRoute,
    private orderService:OrderService,
    private router:Router) { }

  ngOnInit() {
    this.orderForm=this.fb.group({
      orderId:[],
      orderActive:[],
      orderMenuList: this.fb.array([])
    });

    this.route.paramMap.subscribe(params=>{
      const id = +params.get("id");
      if (id){
        this.getOrder(id);
      }else{
        this.order={
          id:null,
          date:null,
          active:true,
          orderdMenuList:[],
        };
      }
    });
    this.menuServcie.showAllActiveMenu().subscribe(data=>this.listOfItems=data);
  }

  getOrder(id:number){
    this.orderService.getOrderById(id).subscribe(
      (order:Order)=>{
        this.order=order;
        this.editMenu(order)
      }
    );
  }

  get menuForm(){
    return this.orderForm.get('orderMenuList') as FormArray
  }

  addMenus(){

    let orderMenuList= this.fb.group({
      id: null,
      menu:this.fb.group({
        menuId:null,
      }),
      quantity:null,
    })

    this.menuForm.push(orderMenuList);
  }

  editMenu(order:Order){

    this.orderForm.patchValue({
        orderId:order.id,
        active:order.active
    });
    this.orderForm.setControl("orderMenuList", this.setExistingProducts(order.orderdMenuList))
  }

  setExistingProducts(orderItems:OrderdMenuList[]):FormArray{
      const formArray = new FormArray([]);
      orderItems.forEach(s=>{
        formArray.push(this.fb.group({
          id:s.id,
          quantity:s.quantity,
          menu: this.fb.group({
            menuId:s.menu.menuId
          })
        }))
      })

      return formArray;
  }

  deleleteMenuList(i){
    this.menuForm.removeAt(i);
  }

  saveMenu(){
    this.MapFormValuesToMenu();
    this.orderService.saveOrder(this.order).subscribe(
      ()=> this.router.navigate(['/orders']),
      (err:any)=>console.log(err)
    );

  }

  MapFormValuesToMenu(){
    this.order.id = this.orderForm.value.orderId;
    this.order.active=this.orderForm.value.active;
    this.order.orderdMenuList = this.orderForm.value.orderMenuList;
  }

  validateOrder(id:number){
    this.orderService.closeOrder(id).subscribe(()=>this.router.navigate(['orders']));
  }

}
