import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Product } from 'src/app/product/product';
import { ProductService } from 'src/app/product/product.service';
import { Observable } from 'rxjs';
import { ProductList } from '../product-list';
import { MenuService } from '../menu.service';
import { Menu } from '../menu';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent implements OnInit {

  myForm:FormGroup;
  productList:Product[];
  product:Product;
  menu:Menu;
  menuImage:string;

  constructor(private fb:FormBuilder,
    private productService:ProductService,
    private menuService:MenuService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
  
    this.productService.getAllProducts().subscribe((data)=>this.productList=data);
    
    
    this.myForm=this.fb.group({
      menuId:[],
      menuImage:[],
      menuActive:false,
      menuDescription:[],
      products: this.fb.array([])
    })

    this.myForm.valueChanges.subscribe(console.log);

    this.route.paramMap.subscribe(params=>{
      const id = +params.get("id");
      if (id){
        this.getMenu(id);
      }else{
        this.menu={
          menuId:null,
          menuDescription:'',
          menuCategory:'',
          menuActive:false,
          products:[],
          image:null
        };
      }
    });

  }

  getMenu(id:number){
    this.menuService.getMenuById(id).subscribe(
      (menu:Menu)=> {
        this.editMenu(menu);
        this.menu=menu;
      }
    );
  }

  editMenu(menu:Menu){
    this.myForm.patchValue({
        menuId:menu.menuId,
        menuDescription:menu.menuDescription,
        menuActive:menu.menuActive,
        menuImage:menu.image
    });

    this.myForm.setControl("products", this.setExistingProducts(menu.products))
  }

  setExistingProducts(products:ProductList[]):FormArray{
      const formArray = new FormArray([]);
      products.forEach(s=>{
        formArray.push(this.fb.group({
          id:s.id,
          qty:s.qty,
          product: this.fb.group({
            prodId:s.product.prodId
          })
        }))
      })

      return formArray;
  }

  get productsForm(){
    return this.myForm.get('products') as FormArray
  }

  addProducts(){

    let products= this.fb.group({
      id: null,
      product:this.fb.group({
        prodId:null,
      }),
      qty:null,
    })

    this.productsForm.push(products);
  }

  deleleteProducts(i){
    this.productsForm.removeAt(i);
  }

  saveMenu(){
    this.MapFormValuesToMenu();
    this.menuService.saveMenu(this.menu).subscribe(
      ()=> this.router.navigate(['/menu']),
      (err:any)=>console.log(err)
    );

  }

  MapFormValuesToMenu(){
    this.menu.menuId = this.myForm.value.menuId;
    this.menu.menuDescription=this.myForm.value.menuDescription;
    this.menu.image=this.myForm.value.menuImage;
    this.menu.menuActive=this.myForm.value.menuActive;
    this.menu.products = this.myForm.value.products;
  }
}
