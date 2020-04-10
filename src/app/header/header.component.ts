declare var $: any;

import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface authImpl{
  login : string;
  password : string;
}

const trueKeyPass : string = "Баерн2019";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {  
  
  private authLog: string;
  private authPass : string;

  private regLog : string;
  private regPass : string;
  private keyPass : string;
  
  constructor(private _sanitizer: DomSanitizer, public http: HttpClient, private router: Router) { }

  auth() {
    this.http.get<authImpl>( "http://127.0.0.1:8080/diplomBackEnd/Polzovatel").subscribe(
      (data:any) => {
        data.forEach(element => {
          if (this.authLog == element.login && this.authPass == element.password){
            sessionStorage.setItem('login', element.login);
            $('#authModal').modal('hide');

            this.authLog = '';
            this.authPass = '';

            var jurnalData = {
              "FIO": sessionStorage.getItem('login'),
              "deistvie": "Авторизовался"
            };

            jQuery.ajax({
              url: "http://127.0.0.1:8080/diplomBackEnd/Jurnal",
              data: JSON.stringify(jurnalData),
              type: "post",
              dataType: "text",
              timeout: 30000
            });
    
          }
        });
    });
  }

  registr() {
    var myData = {
      "login": this.regLog,
      "password": this.regPass,
    };
    if (this.keyPass == trueKeyPass) {
      sessionStorage.setItem('regLogin',this.regLog),
      jQuery.ajax({
        url: "http://127.0.0.1:8080/diplomBackEnd/Polzovatel",
        data: JSON.stringify(myData),
        success: function(dataReq){
          // console.log("success post data polzovatel: ", dataReq);

          var jurnalData = {
            "FIO": sessionStorage.getItem('regLogin'),
            "deistvie": "Регистрация"
          };

          jQuery.ajax({
            url: "http://127.0.0.1:8080/diplomBackEnd/Jurnal",
            data: JSON.stringify(jurnalData),
            type: "post",
            dataType: "text",
            timeout: 30000
          });

        },
        error: function(data) {
          console.log("error post data polzovatel: ", data);
        },
        type: "post",
        dataType: "text",
        timeout: 30000
      });
      $('#registrModal').modal('hide');
      this.regLog = '';
      this.regPass = '';
      this.keyPass = '';
    }
  }

  routeToMainPage():void{ this.router.navigate(['/']); }

  routeToProfile():void{ this.router.navigate(['/profile']); }

  routeToGetZakaz():void{ this.router.navigate(['/getZakaz']); }

  routeToPostZakaz():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
     // this.router.navigate(['/']);
      $("#myToast").toast('show');
    } else {
      this.router.navigate(['/postZakaz']);
    }
  }

  ngOnInit() {
  }

}
