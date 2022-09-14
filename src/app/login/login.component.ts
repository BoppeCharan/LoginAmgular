import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from '../sign-up.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup = new FormGroup({});
  userNameError: any;
  passwordError: any;
  constructor(private signUpService : SignUpService, private route: Router) { }

  ngOnInit(): void {
    this.createForm()
  }
  createForm() {
    
    this.form = new FormGroup({
      name : new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      type : new FormControl('', [Validators.required])
    })
  }



  login(){
    if(this.form.valid){

      console.log("Valid Form")
      if(this.form.value.type == 'buyer'){
        console.log("In Buyer")
          this.signUpService.getUser(this.form.value.name).subscribe( (res:any) => {

            if(res != null){
              sessionStorage.setItem("userId",res.userId);
              if(this.form.value.password == res.userPassword){
                this.route.navigateByUrl('/dashboard')
              }
              else{
                this.passwordError = "Incorrect Password"
              }
            }else{
              this.userNameError = "No Creds Found"
            }
            

          },(err:any)=>{
            this.userNameError = "No Creds Found"
            console.log(err)
          } );
      }
      else{
        console.log("In Seller")
          this.signUpService.getSeller(this.form.value.name).subscribe( (res:any) => {

            if(res != null){
              sessionStorage.setItem("sellerId",res.sellerId);
              if(this.form.value.password == res.sellerPassword){
                console.log("In Seller LOggedIN")
                this.route.navigateByUrl('/dashboard')
              }
              else{
                this.passwordError = "Incorrect Password"
              }
            }else{
              this.userNameError = "No Creds Found"
            }
            

          },(err:any)=>{
            this.userNameError = "No Creds Found"
            console.log(err)
          } );
      }
    }
    console.log(this.form)

  }

}
