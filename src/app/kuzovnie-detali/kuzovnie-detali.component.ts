declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kuzovnie-detali',
  templateUrl: './kuzovnie-detali.component.html',
  styleUrls: ['./kuzovnie-detali.component.css']
})

export class KuzovnieDetaliComponent implements OnInit {

  id_kuzovnieDetali: number;
  typeDetali: string;
  kuzov: string;
  cvetDetali: string;
  storona: string;
  garantiya: string;
  dopComment: string;
  cena: number;

  userInSystem: string = 'Not Set';

  dtOptions: any = { };

  private openModal(info: any): void {
    this.id_kuzovnieDetali = info[0];
    this.typeDetali = info[1];
    this.kuzov = info[2];
    this.cvetDetali = info[3];
    this.storona = info[4];
    this.garantiya = info[5];
    this.dopComment = info[6];
    this.cena = info[7];
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient, private router: Router) {}

  private addKuzovnieDetali(){
    var myData = {
      "typeDetali": this.typeDetali,
      "kuzov": this.kuzov,
      "cvetDetali": this.cvetDetali,
      "storona": this.storona,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/KuzovnieDetali",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success post data KuzovnieDetali: ", data);
      }, 
      error: function(data) {
        console.log("error post data KuzovnieDetali: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    $('#addModal').modal('hide');
  }

  private updateKuzovnieDetali(){
    var myData = {
      "id_kuzovnieDetali": this.id_kuzovnieDetali,
      "typeDetali": this.typeDetali,
      "kuzov": this.kuzov,
      "cvetDetali": this.cvetDetali,
      "storona": this.storona,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/KuzovnieDetali",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success update data KuzovnieDetali: ", data);
      }, 
      error: function(data) {
        console.log("error update data KuzovnieDetali: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    $('#updateModal').modal('hide');
  }

  private deleteKuzovnieDetali(){
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/KuzovnieDetali"+ '?' + $.param({"id_kuzovnieDetali": this.id_kuzovnieDetali}),
      success: function(data){
        console.log("success delete data KuzovnieDetali: ", data);
      }, 
      error: function(data) {
        console.log("error delete data KuzovnieDetali: ", data);
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
    this.id_kuzovnieDetali = null;
    this.typeDetali = null;
    this.kuzov = null;
    this.cvetDetali = null;
    this.storona = null;
    this.garantiya = null;
    this.dopComment = null;
    this.cena = null;
  }
    
}