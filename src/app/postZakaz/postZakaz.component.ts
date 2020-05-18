declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-postZakaz',
  templateUrl: './postZakaz.component.html',
  styleUrls: ['./postZakaz.component.css']
})

export class PostZakazComponent implements OnInit {

  zakazDate: string = formatDate((new Date),'yyyy-MM-dd','en-US');
  zakazTime: string = '23:59';
  aim: string = null;
  place: string = null;
  price: string = null;
  status: string = null;

  constructor(private http: HttpClient, private router: Router) {}
 
  ngOnInit(): void {
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  
  clearData(): void {
    this.zakazDate = formatDate((new Date),'yyyy-MM-dd','en-US');
    this.zakazTime = '23:59';
    this.aim = null;
    this.place = null;
    this.price = null;
    this.status = null;
  } 

  postIt(){
    if ($('#greenRadio').is(':checked')) this.status='Не к спеху';
    if ($('#orangeRadio').is(':checked')) this.status='В томном ожидании';
    if ($('#redRadio').is(':checked')) this.status='Очень, очень надо';

    if (this.zakazDate == '') this.zakazDate = formatDate((new Date),'yyyy-MM-dd','en-US');
    if (this.zakazTime == '') this.zakazTime = '23.59';

    var myData = {
      "id_profile": localStorage.getItem('id_profile'),
      "aim": this.aim,
      "place": this.place,
      "zakazDate":this.zakazDate,
      "zakazTime":this.zakazTime,
      "price": this.price,
      "status": this.status
    };

    var that=this;
  
    jQuery.ajax({
      url: "http://dw0774.duckdns.org/dw0774Server/Zakaz" + "?" + $.param({"login": localStorage.getItem('login'), "password": localStorage.getItem('password')}),
      data: JSON.stringify(myData),
      success: function(dataReq){
        if (JSON.parse(dataReq) === "good response"){
          $("#myToast4").toast('show');
          that.clearData();
        } else {
          $("#myToast5").toast('show');
        }
      },
      error: function(data) {
        // console.log("error post data Zakaz: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
  }

}
