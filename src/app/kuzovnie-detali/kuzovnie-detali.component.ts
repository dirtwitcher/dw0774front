declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kuzovnie-detali',
  templateUrl: './kuzovnie-detali.component.html',
  styleUrls: ['./kuzovnie-detali.component.css']
})

export class KuzovnieDetaliComponent implements OnInit {

  private kuzovnieDetals: any = [];
  private polzovatel: String = "!NONE!";

  id_kuzovnieDetali: number;
  typeDetali: string;
  kuzov: string;
  cvetDetali: string;
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
    this.id_kuzovnieDetali = info[0];
    this.typeDetali = info[1];
    this.kuzov = info[2];
    this.cvetDetali = info[3];
    this.storona = info[4];
    this.garantiya = info[5];
    this.dopComment = info[6];
    this.cena = info[7];
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient) {}

  private addKuzovnieDetali(){
    var myData = {
      "typeDetali": this.typeDetali,
      "kuzov": this.kuzov,
      "cvetDetali": this.cvetDetali,
      "storona": this.storona,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/KuzovnieDetali",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success post data KuzovnieDetali: ", data);
      }, 
      error: function(data) {
        console.log("error post data KuzovnieDetali: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    // this.getAllToTable();
    $('#addModal').modal('hide');
    window.location.reload(false);
  }

  private updateKuzovnieDetali(){
    var myData = {
      "id_kuzovnieDetali": this.id_kuzovnieDetali,
      "typeDetali": this.typeDetali,
      "kuzov": this.kuzov,
      "cvetDetali": this.cvetDetali,
      "storona": this.storona,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/KuzovnieDetali",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success update data KuzovnieDetali: ", data);
      }, 
      error: function(data) {
        console.log("error update data KuzovnieDetali: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    // this.getAllToTable();
    $('#updateModal').modal('hide');
    window.location.reload(false);
  }

  private deleteKuzovnieDetali(){
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/KuzovnieDetali"+ '?' + $.param({"id_kuzovnieDetali": this.id_kuzovnieDetali}),
      success: function(data){
        console.log("success delete data KuzovnieDetali: ", data);
      }, 
      error: function(data) {
        console.log("error delete data KuzovnieDetali: ", data);
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
    this.http.get( "http://127.0.0.1:8080/diplomBackEnd/KuzovnieDetali").subscribe(
      (data) => {
      this.kuzovnieDetals = data;
    });
  }
 
  ngOnInit(): void {
    this.getAllToTable();
  }

  clearData(): void {
    this.id_kuzovnieDetali = null;
    this.typeDetali = null;
    this.kuzov = null;
    this.cvetDetali = null;
    this.storona = null;
    this.garantiya = null;
    this.dopComment = null;
    this.cena = null;
  }
    
}