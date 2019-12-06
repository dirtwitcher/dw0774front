declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-osvet-pribory',
  templateUrl: './osvet-pribory.component.html',
  styleUrls: ['./osvet-pribory.component.css']
})

export class OsvetPriboryComponent implements OnInit {

  id_osvetPribory: number;
  typeDetali: string; 
  storona: string;
  proizvoditel: string;
  garantiya: string;
  dopComment: string;
  cena: number;

  userInSystem: string = 'Not Set';

  dtOptions: any = { };

  private openModal(info: any): void {
    this.id_osvetPribory = info[0];
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

  private addOsvetPribory(){
    var myData = {
      "typeDetali": this.typeDetali,
      "storona": this.storona,
      "proizvoditel": this.proizvoditel,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/OsvetPribory",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success post data OsvetPribory: ", data);
      }, 
      error: function(data) {
        console.log("error post data OsvetPribory: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    $('#addModal').modal('hide');
  }

  private updateOsvetPribory(){
    var myData = {
      "id_osvetPribory": this.id_osvetPribory,
      "typeDetali": this.typeDetali,
      "storona": this.storona,
      "proizvoditel": this.proizvoditel,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/OsvetPribory",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success update data OsvetPribory: ", data);
      }, 
      error: function(data) {
        console.log("error update data OsvetPribory: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    $('#updateModal').modal('hide');
  }

  private deleteOsvetPribory(){
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/OsvetPribory"+ '?' + $.param({"id_osvetPribory": this.id_osvetPribory}),
      success: function(data){
        console.log("success delete data OsvetPribory: ", data);
      }, 
      error: function(data) {
        console.log("error delete data OsvetPribory: ", data);
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
    this.id_osvetPribory = null;
    this.typeDetali = null;
    this.storona = null;
    this.proizvoditel = null;
    this.garantiya = null;
    this.dopComment = null;
    this.cena = null;
  }
    
}