declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kpp',
  templateUrl: './kpp.component.html',
  styleUrls: ['./kpp.component.css']
})

export class KppComponent implements OnInit {

  id_kpp: number;
  typeDetali: string;
  kolvoStupeney: string;
  garantiya: string;
  dopComment: string;
  cena: number;

  userInSystem: string = 'Not Set';

  dtOptions: any = { };

  private openModal(info: any): void {
    this.id_kpp = info[0];
    this.typeDetali = info[1];
    this.kolvoStupeney = info[2];
    this.garantiya = info[3];
    this.dopComment = info[4];
    this.cena = info[5];
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient, private router: Router) {}

  private addKpp(){
    var myData = {
      "typeDetali": this.typeDetali,
      "kolvoStupeney": this.kolvoStupeney,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Kpp",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success post data Kpp: ", data);
      }, 
      error: function(data) {
        console.log("error post data Kpp: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    $('#addModal').modal('hide');
  }

  private updateKpp(){
    var myData = {
      "id_kpp": this.id_kpp,
      "typeDetali": this.typeDetali,
      "kolvoStupeney": this.kolvoStupeney,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Kpp",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success update data Kpp: ", data);
      }, 
      error: function(data) {
        console.log("error update data Kpp: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    $('#updateModal').modal('hide');
  }

  private deleteKpp(){
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Kpp"+ '?' + $.param({"id_kpp": this.id_kpp}),
      success: function(data){
        console.log("success delete data Kpp: ", data);
      }, 
      error: function(data) {
        console.log("error delete data Kpp: ", data);
      },
      type: "delete",
      dataType: "text",
      timeout: 30000
    });
    $('#deleteModal').modal('hide');
  }
 
  ngOnInit(): void {

  }

  logExit():void{
    sessionStorage.setItem('login','Not Set');
    this.router.navigate(['/']);
  }

  clearData(): void {
    this.id_kpp = null;
    this.typeDetali = null;
    this.kolvoStupeney = null;
    this.garantiya = null;
    this.dopComment = null;
    this.cena = null;
  }
    
}
