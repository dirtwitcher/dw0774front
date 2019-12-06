declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otoplenie-kondei',
  templateUrl: './otoplenie-kondei.component.html',
  styleUrls: ['./otoplenie-kondei.component.css']
})

export class OtoplenieKondeiComponent implements OnInit {

  id_otoplenieKondei: number;
  typeDetali: string; 
  material: string;
  proizvoditel: string;
  garantiya: string;
  dopComment: string;
  cena: number;

  userInSystem: string = 'Not Set';

  dtOptions: any = { };

  private openModal(info: any): void {
    this.id_otoplenieKondei = info[0];
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

  private addOtoplenieKondei(){
    var myData = {
      "typeDetali": this.typeDetali,
      "material": this.material,
      "proizvoditel": this.proizvoditel,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/OtoplenieKondei",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success post data OtoplenieKondei: ", data);
      }, 
      error: function(data) {
        console.log("error post data OtoplenieKondei: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    $('#addModal').modal('hide');
  }

  private updateOtoplenieKondei(){
    var myData = {
      "id_otoplenieKondei": this.id_otoplenieKondei,
      "typeDetali": this.typeDetali,
      "material": this.material,
      "proizvoditel": this.proizvoditel,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/OtoplenieKondei",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success update data OtoplenieKondei: ", data);
      }, 
      error: function(data) {
        console.log("error update data OtoplenieKondei: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    $('#updateModal').modal('hide');
  }

  private deleteOtoplenieKondei(){
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/OtoplenieKondei"+ '?' + $.param({"id_otoplenieKondei": this.id_otoplenieKondei}),
      success: function(data){
        console.log("success delete data OtoplenieKondei: ", data);
      }, 
      error: function(data) {
        console.log("error delete data OtoplenieKondei: ", data);
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
    this.id_otoplenieKondei = null;
    this.typeDetali = null;
    this.material = null;
    this.proizvoditel = null;
    this.garantiya = null;
    this.dopComment = null;
    this.cena = null;
  }
    
}