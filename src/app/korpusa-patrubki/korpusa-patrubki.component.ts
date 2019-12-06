declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-korpusa-patrubki',
  templateUrl: './korpusa-patrubki.component.html',
  styleUrls: ['./korpusa-patrubki.component.css']
})

export class KorpusaPatrubkiComponent implements OnInit {

  id_korpusaPatrubki: number;
  typeDetali: string;
  proizvoditel: string;
  garantiya: string;
  dopComment: string;
  cena: number;

  userInSystem: string = 'Not Set';

  dtOptions: any = { };

  private openModal(info: any): void {
    this.id_korpusaPatrubki = info[0];
    this.typeDetali = info[1];
    this.proizvoditel = info[2];
    this.garantiya = info[3];
    this.dopComment = info[4];
    this.cena = info[5];
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient, private router: Router) {}

  private addKorpusaPatrubki(){
    var myData = {
      "typeDetali": this.typeDetali,
      "proizvoditel": this.proizvoditel,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/KorpusaPatrubki",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success post data KorpusaPatrubki: ", data);
      }, 
      error: function(data) {
        console.log("error post data KorpusaPatrubki: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    $('#addModal').modal('hide');
  }

  private updateKorpusaPatrubki(){
    var myData = {
      "id_korpusaPatrubki": this.id_korpusaPatrubki,
      "typeDetali": this.typeDetali,
      "proizvoditel": this.proizvoditel,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/KorpusaPatrubki",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success update data KorpusaPatrubki: ", data);
      }, 
      error: function(data) {
        console.log("error update data KorpusaPatrubki: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    $('#updateModal').modal('hide');
  }

  private deleteKorpusaPatrubki(){
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/KorpusaPatrubki"+ '?' + $.param({"id_korpusaPatrubki": this.id_korpusaPatrubki}),
      success: function(data){
        console.log("success delete data KorpusaPatrubki: ", data);
      }, 
      error: function(data) {
        console.log("error delete data KorpusaPatrubki: ", data);
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
    this.id_korpusaPatrubki = null;
    this.typeDetali = null;
    this.proizvoditel = null;
    this.garantiya = null;
    this.dopComment = null;
    this.cena = null;
  }
    
}