import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }


  userUrl = 'http://localhost:9091/';
  sellerUrl = 'http://localhost:9092/'

  data:any;
  addUser(data:any){
    return  this.http.post(this.userUrl,data);
    // return data;
  }


  addSeller(data:any){
    return this.http.post(this.sellerUrl,data);
  }


  getUser(userName:string){
    return  this.http.get(this.userUrl+"login/"+userName);
  }


  getSeller(sellerName:string){
    return  this.http.get(this.sellerUrl+"login/"+sellerName);
  }

}
