declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tormoza',
  templateUrl: './tormoza.component.html',
  styleUrls: ['./tormoza.component.css']
})

export class TormozaComponent implements OnInit {

  id_tormoza: number;
  typeDetali: string; 
  storona: string;
  proizvoditel: string;
  garantiya: string;
  dopComment: string;
  cena: number;

  userInSystem: string = 'Not Set';

  dtOptions: any = { };

  private openModal(info: any): void {
    this.id_tormoza = info[0];
    this.typeDetali = info[1];
    this.storona = info[2];
    this.proizvoditel = info[3];
    this.garantiya = info[4];
    this.dopComment = info[5];
    this.cena = info[6];
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient, private router: Router) {}

  private addTormoza(){
    var myData = {
      "typeDetali": this.typeDetali,
      "storona": this.storona,
      "proizvoditel": this.proizvoditel,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Tormoza",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success post data Tormoza: ", data);
      }, 
      error: function(data) {
        console.log("error post data Tormoza: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    $('#addModal').modal('hide');
  }

  private updateTormoza(){
    var myData = {
      "id_tormoza": this.id_tormoza,
      "typeDetali": this.typeDetali,
      "storona": this.storona,
      "proizvoditel": this.proizvoditel,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Tormoza",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success update data Tormoza: ", data);
      }, 
      error: function(data) {
        console.log("error update data Tormoza: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    $('#updateModal').modal('hide');
  }

  private deleteTormoza(){
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Tormoza"+ '?' + $.param({"id_tormoza": this.id_tormoza}),
      success: function(data){
        console.log("success delete data Tormoza: ", data);
      }, 
      error: function(data) {
        console.log("error delete data Tormoza: ", data);
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
    this.id_tormoza = null;
    this.typeDetali = null;
    this.storona = null;
    this.proizvoditel = null;
    this.garantiya = null;
    this.dopComment = null;
    this.cena = null;
  }
    
}