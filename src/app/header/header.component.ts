declare var $: any;

import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface authImpl{
  login : string;
  password : string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {  

  private rand_1 : number = 0;
  private rand_2 : number = 0;
  private rand_znak : string = "+";
  private capchaAnswer : number = null;
  private capchaUserAnswer : number = null;
  private capchaInfo : string = "Жду ответ";

  private user: string = "Вы не в системе";
  
  private authLog: string;
  private authPass : string;

  private regLog : string;
  private regPass : string;
  
  constructor(private _sanitizer: DomSanitizer, public http: HttpClient, private router: Router) { }

  auth() {
    this.http.get<authImpl>( "http://127.0.0.1:8080/dw0774/Profile").subscribe(
      (data:any) => {
        data.forEach(element => {
          if (this.authLog == element.login && this.authPass == element.password){
            sessionStorage.setItem('login', element.login);
            $('#authModal').modal('hide');

            this.user = this.authLog;

            this.authLog = '';
            this.authPass = '';
    
          }
        });
    });
  }

  registr() {
    var myData = {
      "login": this.regLog,
      "password": this.regPass,
    };

    if (this.capchaAnswer != this.capchaUserAnswer){
      this.capchaChange();
     } else {
      
      // sessionStorage.setItem('regLogin',this.regLog),
      jQuery.ajax({
        url: "http://127.0.0.1:8080/dw0774/Profile",
        data: JSON.stringify(myData),
        success: function(dataReq){
          console.log("data Profile: ", dataReq);
        },
        error: function(data) {
          console.log("error post data Profile: ", data);
        },
        type: "post",
        dataType: "text",
        timeout: 30000
      });
      $('#registrModal').modal('hide');
      this.regLog = '';
      this.regPass = '';

     }
  }

  routeToMainPage():void{ this.router.navigate(['/']); }

  routeToProfile():void{ this.router.navigate(['/profile']); }

  routeToGetZakaz():void{ this.router.navigate(['/getZakaz']); }

  routeToPostZakaz():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
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
    } else {
      this.capchaInfo = "Ответ верен"
    }
  }

  profile(){
    if (sessionStorage.getItem('login') === "Not Set"){
      $("#myToast").toast('show');
    } else {
      
    }
  }

  ngOnInit() {
  }

}
