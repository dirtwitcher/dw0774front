declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-osvet-pribory',
  templateUrl: './osvet-pribory.component.html',
  styleUrls: ['./osvet-pribory.component.css']
})
export class OsvetPriboryComponent implements OnInit {

  private osvetPribors: any = [];
  private polzovatel: String = "!NONE!";

  id_osvetPribory: number;
  typeDetali: string; 
  storona: string;
  proizvoditel: string;
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

  constructor(private http: HttpClient) {}

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
    // this.getAllToTable();
    $('#addModal').modal('hide');
    window.location.reload(false);
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
    // this.getAllToTable();
    $('#updateModal').modal('hide');
    window.location.reload(false);
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
    // this.getAllToTable();
    $('#deleteModal').modal('hide');
    window.location.reload(false);
  }

  private getAllToTable(): void {
    this.http.get( "http://127.0.0.1:8080/diplomBackEnd/OsvetPribory").subscribe(
      (data) => {
      this.osvetPribors = data;
    });
  }
 
  ngOnInit(): void {
    this.getAllToTable();
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