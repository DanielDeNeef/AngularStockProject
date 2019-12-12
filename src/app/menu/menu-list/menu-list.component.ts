import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { Menu } from '../menu';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
  
})
export class MenuListComponent implements OnInit {
  menus:Menu[];
  faSearch=faSearch;

  constructor(private menuService:MenuService,private route:Router) { }

  ngOnInit() {
    this.menuService.showAllMenu().subscribe((data)=>this.menus=data)
  }

  deleteMenu(menu:Menu){
    this.menuService.deleteMenu(menu)
    .subscribe((data)=> this.menus.splice(this.menus.indexOf(menu),1));
  }

  addNewMenu(){
    this.route.navigate(['/showMenu']);
  }

  editButton(id:number){
    this.route.navigate(['/edit',id])
  }

  search(search:string){
    if(search.length>0){
    this.menuService.searchMenu(search).subscribe(data=>this.menus=data);
    }else{
      this.ngOnInit();
    }
  }

}
