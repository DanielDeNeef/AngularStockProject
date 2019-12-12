import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuFormComponent } from './menu/menu-form/menu-form.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderFormComponent } from './order/order-form/order-form.component';


const routes: Routes = [
  {path:'',component:ProductComponent},
  {path:'products',component:ProductListComponent},
  {path:'showProduct',component:ProductFormComponent},
  {path:'menu',component:MenuListComponent},
  {path:'showMenu',component:MenuFormComponent},
  {path:"edit/:id", component:MenuFormComponent},
  {path:"orders",component:OrderListComponent},
  {path:"order/edit/:id",component:OrderFormComponent},
  {path:"order/new",component:OrderFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
