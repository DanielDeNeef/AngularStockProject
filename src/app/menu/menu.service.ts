import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Menu } from './menu';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  baseUrl="http://localhost:8080/menu";

  constructor(private http:HttpClient, private route:Router) { }

  showAllMenu():Observable<Menu[]>{
   return this.http.get<Menu[]>(this.baseUrl);
  }

  showAllActiveMenu():Observable<Menu[]>{
    return this.http.get<Menu[]>(this.baseUrl+"/active");
   }

  deleteMenu(menu):Observable<Menu>{
    return this.http.delete<Menu>(this.baseUrl+'/'+menu.menuId);
  }

  saveMenu(menu:Menu):Observable<Menu>{
    return this.http.post<Menu>(this.baseUrl,menu);
  }

  getMenuById(id:number):Observable<Menu>{
    return this.http.get<Menu>(this.baseUrl+"/"+id);
  }

  searchMenu(search:string):Observable<Menu[]>{
    return this.http.get<Menu[]>(this.baseUrl+"/search/"+search);
  }
  
}
