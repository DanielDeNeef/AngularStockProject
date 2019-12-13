import { OrderdMenuList } from './order-menu-list';
import { DatePipe } from '@angular/common';

export class Order {
    id:number;
    date:DatePipe;
    active:boolean;
    orderdMenuList:OrderdMenuList[];
}
