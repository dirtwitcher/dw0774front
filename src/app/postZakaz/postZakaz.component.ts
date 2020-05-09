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

  private id_profile: string = localStorage.getItem('id_profile');
  private zakazDate: string = formatDate((new Date).toLocaleDateString(),'yyyy-dd-MM','en-US');
  private zakazTime: string = '23:59';
  private aim: string = null;
  private place: string = null;
  private price: string = null;
  private status: string = null;

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
  
  private clearData(): void {
    this.zakazDate = formatDate((new Date).toLocaleDateString(),'yyyy-dd-MM','en-US');
    this.zakazTime = '23:59';
    this.aim = null;
    this.place = null;
    this.price = null;
    this.status = null;
  } 

  private postIt(){
    if ($('#greenRadio').is(':checked')) this.status='Не к спеху';
    if ($('#orangeRadio').is(':checked')) this.status='В томном ожидании';
    if ($('#redRadio').is(':checked')) this.status='Очень, очень надо';

    if (this.zakazDate == '') this.zakazDate = formatDate((new Date).toLocaleDateString(),'yyyy-dd-MM','en-US');
    if (this.zakazTime == '') this.zakazTime = '23.59';

    var myData = {
      "id_profile": this.id_profile,
      "aim": this.aim,
      "place": this.place,
      "zakazDate":this.zakazDate,
      "zakazTime":this.zakazTime,
      "price": this.price,
      "status": this.status
    };

    var that=this;
  
    jQuery.ajax({
      url: "http://127.0.0.1:8080/dw0774/Zakaz",
      data: JSON.stringify(myData),
      success: function(dataReq){
        // console.log("data Zakaz: ", dataReq);
        if (dataReq === "good post"){
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
