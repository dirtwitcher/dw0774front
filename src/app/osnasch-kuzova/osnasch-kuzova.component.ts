declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-osnasch-kuzova',
  templateUrl: './osnasch-kuzova.component.html',
  styleUrls: ['./osnasch-kuzova.component.css']
})

export class OsnaschKuzovaComponent implements OnInit {

  private osnaschKuzovs: any = [];
  private polzovatel: String = "!NONE!";

  id_osnaschKuzova: number;
  typeDetali: string; 
  storona: string;
  garantiya: string;
  dopComment: string;
  cena: number;

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
    this.id_osnaschKuzova = info[0];
    this.typeDetali = info[1];
    this.storona = info[4];
    this.garantiya = info[5];
    this.dopComment = info[6];
    this.cena = info[7];
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient) {}

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
    // this.getAllToTable();
    $('#addModal').modal('hide');
    window.location.reload(false);
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
    // this.getAllToTable();
    $('#updateModal').modal('hide');
    window.location.reload(false);
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
    // this.getAllToTable();
    $('#deleteModal').modal('hide');
    window.location.reload(false);
  }

  private getAllToTable(): void {
    this.http.get( "http://127.0.0.1:8080/diplomBackEnd/OsnaschKuzova").subscribe(
      (data) => {
      this.osnaschKuzovs = data;
    });
  }
 
  ngOnInit(): void {
    this.getAllToTable();
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