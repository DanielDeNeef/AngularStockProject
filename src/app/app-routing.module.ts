import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuFormComponent } from './menu/menu-form/menu-form.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderFormComponent } from './order/order-form/order-form.component';
import { ProductTableComponent } from './product/product-table/product-table.component';


const routes: Routes = [
  {path:'',component:ProductComponent},
  {path:'products',component:ProductTableComponent},
  {path:'showProduct',component:ProductFormComponent},
  {path:'menu',component:MenuListComponent},
  {path:'showMenu',component:MenuFormComponent},
  {path:"edit/:id", component:MenuFormComponent},
  {path:"orders",component:OrderListComponent},
  {path:"order/edit/:id",component:OrderFormComponent},
  {path:"order/new",component:OrderFormComponent},
  {path:"table",component:ProductTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
