declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rulevoe-upravlenie',
  templateUrl: './rulevoe-upravlenie.component.html',
  styleUrls: ['./rulevoe-upravlenie.component.css']
})

export class RulevoeUpravlenieComponent implements OnInit {

  id_rulevoeUpravlenie: number;
  typeDetali: string;
  proizvoditel: string;
  garantiya: string;
  dopComment: string;
  cena: number;

  userInSystem: string = 'Not Set';

  dtOptions: any = { };

  private openModal(info: any): void {
    this.id_rulevoeUpravlenie = info[0];
    this.typeDetali = info[1];
    this.proizvoditel = info[2];
    this.garantiya = info[3];
    this.dopComment = info[4];
    this.cena = info[5];
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient, private router: Router) {}

  private addRulevoeUpravlenie(){
    var myData = {
      "typeDetali": this.typeDetali,
      "proizvoditel": this.proizvoditel,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/RulevoeUpravlenie",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success post data RulevoeUpravlenie: ", data);
      }, 
      error: function(data) {
        console.log("error post data RulevoeUpravlenie: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    $('#addModal').modal('hide');
  }

  private updateRulevoeUpravlenie(){
    var myData = {
      "id_rulevoeUpravlenie": this.id_rulevoeUpravlenie,
      "typeDetali": this.typeDetali,
      "proizvoditel": this.proizvoditel,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/RulevoeUpravlenie",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success update data RulevoeUpravlenie: ", data);
      }, 
      error: function(data) {
        console.log("error update data RulevoeUpravlenie: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    $('#updateModal').modal('hide');
  }

  private deleteRulevoeUpravlenie(){
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/RulevoeUpravlenie"+ '?' + $.param({"id_rulevoeUpravlenie": this.id_rulevoeUpravlenie}),
      success: function(data){
        console.log("success delete data RulevoeUpravlenie: ", data);
      }, 
      error: function(data) {
        console.log("error delete data RulevoeUpravlenie: ", data);
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
    this.id_rulevoeUpravlenie = null;
    this.typeDetali = null;
    this.proizvoditel = null;
    this.garantiya = null;
    this.dopComment = null;
    this.cena = null;
  }
    
}