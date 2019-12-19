import { ProductList } from './product-list';

export class Menu {
    menuId:number;
    menuDescription?:string;
    menuCategory?:string;
    menuActive?:boolean;
    products?:ProductList[];
    image?:string;
}
