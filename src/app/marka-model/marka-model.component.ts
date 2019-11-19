declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marka-model',
  templateUrl: './marka-model.component.html',
  styleUrls: ['./marka-model.component.css']
})

export class MarkaModelComponent implements OnInit {

  private typeAutos: any = [];
  private polzovatel: String = "!NONE!";

  id_typeAuto: number;
  marka: string;
  model: string;

  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    // processing: true,

    rowCallback: (row: Node, data: any[] | Object, index: number) => {
      $('td', row).unbind('click');
      $('td', row).bind('click', () => {
        this.openModal(data);
      });
        return row;
    }
    
  };

  private openModal(info: any): void {
    this.id_typeAuto = info[0];
    this.marka = info[1];
    this.model = info[2];
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient) {}

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
    // this.getAllToTable();
    $('#addModal').modal('hide');
    window.location.reload(false);
  }

  private updateTypeAuto(){
    var myData = {
      "id_typeAuto": this.id_typeAuto,
      "marka": this.marka,
      "modek": this.model,
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
    // this.getAllToTable();
    $('#updateModal').modal('hide');
    window.location.reload(false);
  }

  private deleteTypeAuto(){
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/TypeAuto"+ '?' + $.param({"id_auto": this.id_typeAuto}),
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
    // this.getAllToTable();
    $('#deleteModal').modal('hide');
    window.location.reload(false);
  }

  private getAllToTable(): void {
    this.http.get( "http://127.0.0.1:8080/diplomBackEnd/TypeAuto").subscribe(
      (data) => {
      this.typeAutos = data;
    });
  }
 
  ngOnInit(): void {
    this.getAllToTable();
  }

  clearData(): void {
    this.id_typeAuto = null;
    this.marka = null;
    this.model = null;
  }
    
}