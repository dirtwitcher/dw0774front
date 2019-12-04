declare var $: any;

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer} from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { AutoComponent } from 'src/app/auto/auto.component'

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
  
  static userInSystem: String = "Not Set";
  private authLog: string;
  private authPass : string;

  private regLog : string;
  private regPass : string;
  private keyPass : string;
  private trueKeyPass : string = "qq123";
  
  constructor(private _sanitizer: DomSanitizer, public http: HttpClient) { }

  auth() {
    this.http.get<authImpl>( "http://127.0.0.1:8080/diplomBackEnd/Polzovatel").subscribe(
      (data:any) => {
        data.forEach(element => {
          if (this.authLog == element.login && this.authPass == element.password){
            HeaderComponent.userInSystem = element.login;
            console.log('user in system: ' + HeaderComponent.userInSystem);
            $('#authModal').modal('hide');
          }
        });
    });
  }

  registr() {
    var myData = {
      "login": this.regLog,
      "password": this.regPass,
    };
    if (this.keyPass == this.trueKeyPass) {
      jQuery.ajax({
        url: "http://127.0.0.1:8080/diplomBackEnd/Polzovatel",
        data: JSON.stringify(myData),
        success: function(dataReq){
          console.log("success post data polzovatel: ", dataReq);
          // var table = $('#datatable').DataTable();
          // table.ajax.reload();
        },
        error: function(data) {
          console.log("error post data polzovatel: ", data);
        },
        type: "post",
        dataType: "text",
        timeout: 30000
      });
      $('#registrModal').modal('hide');
    }
  }

  ngOnInit() {
  }

}
