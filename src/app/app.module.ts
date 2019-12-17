import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductService } from './product/product.service';
import {HttpClientModule} from '@angular/common/http';
import { ProductFormComponent } from './product/product-form/product-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuFormComponent } from './menu/menu-form/menu-form.component';
import { MenuService } from './menu/menu.service';
import { OrderComponent } from './order/order.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderFormComponent } from './order/order-form/order-form.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FileSaverService } from './file-saver.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule, MatDialogModule, MatFormFieldModule, MatInputModule,MatButtonModule} from '@angular/material';
import { ProductTableComponent } from './product/product-table/product-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductFormComponent,
    MenuComponent,
    MenuListComponent,
    MenuFormComponent,
    OrderComponent,
    OrderListComponent,
    OrderFormComponent,
    ProductTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule  
  ],
  providers: [ProductService,MenuService,FileSaverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
