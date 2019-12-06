declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-osnasch-kuzova',
  templateUrl: './osnasch-kuzova.component.html',
  styleUrls: ['./osnasch-kuzova.component.css']
})

export class OsnaschKuzovaComponent implements OnInit {

  id_osnaschKuzova: number;
  typeDetali: string; 
  storona: string;
  garantiya: string;
  dopComment: string;
  cena: number;

  userInSystem: string = 'Not Set';

  dtOptions: any = { };

  private openModal(info: any): void {
    this.id_osnaschKuzova = info[0];
    this.typeDetali = info[1];
    this.storona = info[2];
    this.garantiya = info[3];
    this.dopComment = info[4];
    this.cena = info[5];
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient, private router: Router) {}

  private addOsnaschKuzova(){
    var myData = {
      "typeDetali": this.typeDetali,
      "storona": this.storona,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/OsnaschKuzova",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success post data OsnaschKuzova: ", data);
      }, 
      error: function(data) {
        console.log("error post data OsnaschKuzova: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    $('#addModal').modal('hide');
  }

  private updateOsnaschKuzova(){
    var myData = {
      "id_osnaschKuzova": this.id_osnaschKuzova,
      "typeDetali": this.typeDetali,
      "storona": this.storona,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/OsnaschKuzova",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success update data OsnaschKuzova: ", data);
      }, 
      error: function(data) {
        console.log("error update data OsnaschKuzova: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    $('#updateModal').modal('hide');
  }

  private deleteOsnaschKuzova(){
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/OsnaschKuzova"+ '?' + $.param({"id_osnaschKuzova": this.id_osnaschKuzova}),
      success: function(data){
        console.log("success delete data OsnaschKuzova: ", data);
      }, 
      error: function(data) {
        console.log("error delete data OsnaschKuzova: ", data);
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
    this.id_osnaschKuzova = null;
    this.typeDetali = null;
    this.storona = null;
    this.garantiya = null;
    this.dopComment = null;
    this.cena = null;
  }
    
}