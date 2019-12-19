import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuService } from '../menu.service';
import { Menu } from '../menu';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { faEye,faTrash,faPlus } from "@fortawesome/free-solid-svg-icons";
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
  
})
export class MenuListComponent implements OnInit {
  listData: MatTableDataSource<Menu>;
  displayedColumns = ['menuId','menuDescription','menuCategory','menuActive','image','action'];
  faEye=faEye;
  faTrash=faTrash;
  faPlus=faPlus;
  faSearch=faSearch;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static:true}) sort:MatSort;

  constructor(private menuService:MenuService,private route:Router) { }

  ngOnInit() {
    this.menuService.showAllMenu().subscribe((data)=>this.listData=new MatTableDataSource<Menu>(data));
    setTimeout(() =>this.listData.sort=this.sort);
    setTimeout(() => this.listData.paginator=this.paginator);
  }

  deleteMenu(id:number){
    this.menuService.deleteMenu(id).subscribe();
    const itemIndex = this.listData.data.findIndex(obj => obj['menuId']===id);
    this.listData.data.splice(itemIndex,1);    
    setTimeout(() =>this.listData.sort=this.sort);
    setTimeout(() => this.listData.paginator=this.paginator);
  }

  addNewMenu(){
    this.route.navigate(['/showMenu']);
  }

  editButton(id:number){
    this.route.navigate(['/edit',id])
  }

  applyFilter(filterValue: string) {
    this.listData.filter = filterValue.trim().toLowerCase();
  }

}
