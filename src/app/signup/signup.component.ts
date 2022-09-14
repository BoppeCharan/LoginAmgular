import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Routes } from '@angular/router';
import { SignUpService } from '../sign-up.service';
import { Router } from '@angular/router';
import { Seller } from './Seller';









@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers : [SignUpService]
})
export class SignupComponent implements OnInit {


  form:FormGroup = new FormGroup({});
  emailError: any;
  passwordError: any;
  dataSource:any;
  userNameError: any;
  sellerObject: Seller = new Seller;

  // constructor() { }
  constructor(private signUpService : SignUpService, private route: Router) { }
  // 
  ngOnInit(): void {
    this.createForm()
  }
  createForm() {

    this.form = new FormGroup({
      userName : new FormControl('',[Validators.required]),
      // userName : new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z]*")]),
      userEmail : new FormControl('',[Validators.required,Validators.email]),
      userPassword: new FormControl('',[Validators.required]),
      // psw: new FormControl('',[Validators.required,Validators.pattern(/^[A-Z@~`!@#$%^&()_=+\\\\';:\"\\/?>.<,-]$/i)]),
      pswRepeat :new FormControl('',[Validators.required]),
      type : new FormControl('', [Validators.required])
    })

  }


  signUp(){

    if(this.form.valid){
      if(this.form.value.userPassword == this.form.value.pswRepeat){

        if(this.form.value.type == 'buyer'){
            this.signUpService.addUser(this.form.value).subscribe( (res:any) => {

              sessionStorage.setItem("userId",res.userId);


              this.route.navigateByUrl('/dashboard')

            },(err:any)=>{
              this.userNameError = "This Name Found in DB"
              this.emailError = "This Email Id Found in DB"
              console.log(err)
            } );
        }
        else{

          this.sellerObject.sellerName = this.form.value.userName;
          this.sellerObject.sellerEmail = this.form.value.userEmail;
          this.sellerObject.sellerPassword= this.form.value.userPassword;


          this.signUpService.addSeller(this.sellerObject).subscribe( (res:any) => {

            console.log(res)
            sessionStorage.setItem("sellerId",res.sellerId);


            this.route.navigateByUrl('/dashboard')

          },(err:any)=>{
            this.userNameError = "This Name Found in DB"
            this.emailError = "This Email Id Found in DB"
            console.log(err)
          } );
        }
      }
      else{
        console.log("Password didnt Matched");
        this.passwordError = "Password didnt Matched";
      }
    }
    console.log(this.form)
  }


  

}
