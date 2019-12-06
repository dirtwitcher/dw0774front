declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sistema-ohlajdeniya',
  templateUrl: './sistema-ohlajdeniya.component.html',
  styleUrls: ['./sistema-ohlajdeniya.component.css']
})

export class SistemaOhlajdeniyaComponent implements OnInit {

  id_sistemaOhlajdeniya: number;
  typeDetali: string; 
  material: string;
  proizvoditel: string;
  garantiya: string;
  dopComment: string;
  cena: number;

  userInSystem: string = 'Not Set';

  dtOptions: any = { };

  private openModal(info: any): void {
    this.id_sistemaOhlajdeniya = info[0];
    this.typeDetali = info[1];
    this.material = info[2];
    this.proizvoditel = info[3];
    this.garantiya = info[4];
    this.dopComment = info[5];
    this.cena = info[6];
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient, private router: Router) {}

  private addSistemaOhlajdeniya(){
    var myData = {
      "typeDetali": this.typeDetali,
      "material": this.material,
      "proizvoditel": this.proizvoditel,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/SistemaOhlajdeniya",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success post data SistemaOhlajdeniya: ", data);
      }, 
      error: function(data) {
        console.log("error post data SistemaOhlajdeniya: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    $('#addModal').modal('hide');
  }

  private updateSistemaOhlajdeniya(){
    var myData = {
      "id_sistemaOhlajdeniya": this.id_sistemaOhlajdeniya,
      "typeDetali": this.typeDetali,
      "material": this.material,
      "proizvoditel": this.proizvoditel,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/SistemaOhlajdeniya",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success update data SistemaOhlajdeniya: ", data);
      }, 
      error: function(data) {
        console.log("error update data SistemaOhlajdeniya: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    $('#updateModal').modal('hide');
  }

  private deleteSistemaOhlajdeniya(){
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/SistemaOhlajdeniya"+ '?' + $.param({"id_sistemaOhlajdeniya": this.id_sistemaOhlajdeniya}),
      success: function(data){
        console.log("success delete data SistemaOhlajdeniya: ", data);
      }, 
      error: function(data) {
        console.log("error delete data SistemaOhlajdeniya: ", data);
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
    this.id_sistemaOhlajdeniya = null;
    this.typeDetali = null;
    this.material = null;
    this.proizvoditel = null;
    this.garantiya = null;
    this.dopComment = null;
    this.cena = null;
  }
    
}