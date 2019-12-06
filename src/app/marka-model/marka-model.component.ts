declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marka-model',
  templateUrl: './marka-model.component.html',
  styleUrls: ['./marka-model.component.css']
})

export class MarkaModelComponent implements OnInit {

  id_typeAuto: number;
  marka: string;
  model: string;

  userInSystem: string = 'Not Set';

  dtOptions: any = { };

  private openModal(info: any): void {
    this.id_typeAuto = info[0];
    this.marka = info[1];
    this.model = info[2];
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient, private router: Router) {}

  private addTypeAuto(){
    var myData = {
      "marka": this.marka,
      "model": this.model,
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/TypeAuto",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success post data marka model: ", data);
      }, 
      error: function(data) {
        console.log("error post data marka model: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    $('#addModal').modal('hide');
  }

  private updateTypeAuto(){
    var myData = {
      "id_typeAuto": this.id_typeAuto,
      "marka": this.marka,
      "model": this.model,
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/TypeAuto",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success update data marka model: ", data);
      }, 
      error: function(data) {
        console.log("error update data marka model: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    $('#updateModal').modal('hide');
  }

  private deleteTypeAuto(){
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/TypeAuto"+ '?' + $.param({"id_typeAuto": this.id_typeAuto}),
      success: function(data){
        console.log("success delete data marka model: ", data);
      }, 
      error: function(data) {
        console.log("error delete data marka model: ", data);
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
    this.id_typeAuto = null;
    this.marka = null;
    this.model = null;
  }
    
}