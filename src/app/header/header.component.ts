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

  routeToTypeAuto():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/typeAuto']);
    }
  }

  routeToAuto():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/auto']);
    }
  }

  routeToTypeDvigatel():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/dvigatel']);
    }
  }
  
  routeToToplivnayaSistema():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/toplivnayaSistema']);
    }
  }

  routeToSistemaOhlajdeniya():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/sistemaOhlajdeniya']);
    }
  }
  
  routeToOtoplenieKondei():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/otoplenieKondei']);
    }
  }

  routeToKorpusaPatrubki():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/korpusaPatrubki']);
    }
  }

  routeToKuzovnieDetali():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/kuzovnieDetali']);
    }
  }

  routeToOsnaschKuzova():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/osnaschKuzova']);
    }
  }

  routeToElektrika():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/elektrika']);
    }
  }

  routeToOsvetPribory():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/osvetPribory']);
    }
  }

  routeToKpp():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/kpp']);
    }
  }

  routeToTransmissiya():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/transmissiya']);
    }
  }

  routeToRulevoeUpravlenie():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/rulevoeUpravlenie']);
    }
  }

  routeToPodveska():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/podveska']);
    }
  }

  routeToTormoza():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/tormoza']);
    }
  }

  routeToKolesaDiski():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/kolesaDiski']);
    }
  }

  routeToDopTovari():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/dopTovari']);
    }
  }

  routeToPolzovatel():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/polzovatel']);
    }
  }

  routeToJurnal():void{ 
    if (sessionStorage.getItem('login') === "Not Set"){
      this.router.navigate(['/']);
    } else{
      this.router.navigate(['/jurnal']);
    }
  }

  ngOnInit() {
  }

}
