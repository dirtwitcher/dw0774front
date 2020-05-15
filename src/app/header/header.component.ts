declare var $: any;

import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {UserNameService} from '../service/user-name-service.service';
import { timer } from 'rxjs';

interface authImpl{
  id_profile : string;
  login : string;
  password : string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  rand_1 : number = 0;
  rand_2 : number = 0;
  rand_znak : string = "+";
  capchaAnswer : number = null;
  capchaUserAnswer : number = null;
  capchaInfo : string = "Жду ответ";

  user : string = "Вы не в системе";

  authLog : string;
  authPass : string;

  regLog : string;
  regPass : string;
  regFIO : string;
  regNumber : string;
  regMail : string;

  logNotValid : string = " * Ваш логин должен составлять 4-25 символов.";
  passNotValid : string = " * Ваш пароль должен составлять 8-25 символов.";
  numberNotValid : string = " * Пожалуйста, укажите Ваш номер телефона в формате (12) 345-67-89";
  mailNotValid : string = " * Пожалуйста, укажите Ваш профиль в соц сети.";

  constructor(private _sanitizer: DomSanitizer, public http: HttpClient, private router: Router, private UserNameService: UserNameService) { }

  auth() {
    this.http.get<authImpl>( "http://127.0.0.1:8080/dw0774Server/Profile"+ '?' + $.param({"action": "auth", "login": this.authLog, "password": this.authPass})).subscribe(
      (data:any) => {
        if (data !== "bad response"){
          $('#authModal').modal('hide');
          localStorage.setItem('id_profile', data);
          localStorage.setItem('login', this.authLog);
          localStorage.setItem('password', this.authPass);
          this.user = localStorage.getItem('login');
          this.router.navigate(['/']);
        } else {
          $("#myToast3").toast('show');
        }
      }
    );
  }

  registr() {
    var myData = {
      "login": this.regLog,
      "password": this.regPass,
      "FIO": this.regFIO,
      "callNumber":this.regNumber,
      "email":this.regMail
    };
    
    if (this.logNotValid == '' && this.passNotValid == '' && this.numberNotValid == '' && this.mailNotValid == '' ){
      if (this.capchaAnswer != this.capchaUserAnswer){
        this.capchaChange();
      } else {

        jQuery.ajax({
          url: "http://127.0.0.1:8080/dw0774Server/Profile",
          data: JSON.stringify(myData),
          success: function(dataReq){
            // console.log("data Profile: ", dataReq);
            if (JSON.parse(dataReq) === "bad post") {
              $("#myToast2").toast('show');
            } else 
            if (JSON.parse(dataReq) === "good post"){
              $('#registrModal').modal('hide');
            }
          },
          error: function(data) {
            // console.log("error post data Profile: ", data);
          },
          type: "post",
          dataType: "text",
          timeout: 30000
        });    

      }
    }
  }

  refreshRegistr(){
    this.regLog = '';
    this.regPass = '';
    this.regFIO = '';
    this.regNumber = '';
    this.regMail = '';

    this.logNotValid = " * Ваш логин должен составлять 4-25 символов.";
    this.passNotValid = " * Ваш пароль должен составлять 8-25 символов.";
    this.numberNotValid = " * Пожалуйста, укажите Ваш номер телефона в формате (12) 345-67-89";
    this.mailNotValid = " * Пожалуйста, укажите Ваш профиль в соц сети.";
  }

  refreshAuth(){
    this.authLog = '';
    this.authPass = '';
  }

  routeToMainPage():void{ this.router.navigate(['/']); }

  routeToProfile(){
    if (localStorage.getItem('login') === "Вы не в системе"){
      $("#myToast").toast('show');
    } else {
      this.router.navigate(['/profile']);
    }
  }

  routeToGetZakaz():void{ this.router.navigate(['/getZakaz']); }

  routeToPostZakaz():void{ 
    if (localStorage.getItem('login') === "Вы не в системе"){
      $("#myToast").toast('show');
    } else {
      this.router.navigate(['/postZakaz']);
    }
  }

  capchaChange(){
    this.rand_1 = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    this.rand_2 = Math.floor(Math.random() * (9 - 0 + 1)) + 0;

    if (Math.floor(Math.random() * (1 - 0 + 1)) + 0 === 0) this.rand_znak = "-";
    if (Math.floor(Math.random() * (1 - 0 + 1)) + 0 === 0) this.rand_znak = "+";
    if (this.rand_znak === "+") this.capchaAnswer = this.rand_1 + this.rand_2;
    if (this.rand_znak === "-") this.capchaAnswer = this.rand_1 - this.rand_2;

    this.capchaUserAnswer=null;
    this.capchaInfo = "Жду ответ"
  }

  checkAnswer(){
    if (this.capchaAnswer != this.capchaUserAnswer){
      this.capchaInfo = "Ответ неверен"
    } else 
    if (this.capchaAnswer == this.capchaUserAnswer){
      this.capchaInfo = "Ответ верен"
    }
    if (this.capchaUserAnswer == null){
      this.capchaInfo = "Жду ответ"
    }
  }

  checkLoginValid(){
    if (this.regLog.length < 4){
      this.logNotValid = " * Ваш логин должен составлять 4-25 символов."
    } else {
      this.logNotValid = "";
    }
  }

  checkPassValid(){
    if (this.regPass.length < 8){
      this.passNotValid = " * Ваш пароль должен составлять 8-25 символов."
    } else {
      this.passNotValid = "";
    }
  }

  checkNumberValid(){
    if (this.regNumber.length < 9){
      this.numberNotValid = " * Пожалуйста, укажите Ваш номер телефона в формате (12) 345-67-89"
    } else {
      this.numberNotValid = "";
    }
  }

  checkMailValid(){
    if (this.regMail.length < 1){
      this.mailNotValid = " * Пожалуйста, укажите Ваш профиль в соц сети."
    } else {
      this.mailNotValid = "";
    }
  }

  ngOnInit() {
    this.user = localStorage.getItem('login');

    this.UserNameService.user.subscribe((userName: string) => {
      this.user = userName;
  });
  }

}
