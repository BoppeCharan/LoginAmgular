import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Ekart';


  constructor(private route:Router){}

  Login(){

    this.route.navigateByUrl('/login');


  }

  signUp(){
    this.route.navigateByUrl('/signUp');
  }
}
