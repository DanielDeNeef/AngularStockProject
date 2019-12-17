import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileSaverService {

  constructor(private http:HttpClient) { }

  saveFile(file:any){
    console.log(file);
    return this.http.post("http://localhost:8081/file",file);
  }

}
