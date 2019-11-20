declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transmissiya',
  templateUrl: './transmissiya.component.html',
  styleUrls: ['./transmissiya.component.css']
})

export class TransmissiyaComponent implements OnInit {

  private transmissiyas: any = [];
  private polzovatel: String = "!NONE!";

  id_transmissiya: number;
  typeDetali: string;
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
    this.id_transmissiya = info[0];
    this.typeDetali = info[1];
    this.garantiya = info[2];
    this.dopComment = info[3];
    this.cena = info[4];
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient) {}

  private addTransmissiya(){
    var myData = {
      "typeDetali": this.typeDetali,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Transmissiya",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success post data Transmissiya: ", data);
      }, 
      error: function(data) {
        console.log("error post data Transmissiya: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    // this.getAllToTable();
    $('#addModal').modal('hide');
    window.location.reload(false);
  }

  private updateTransmissiya(){
    var myData = {
      "id_transmissiya": this.id_transmissiya,
      "typeDetali": this.typeDetali,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Transmissiya",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success update data Transmissiya: ", data);
      }, 
      error: function(data) {
        console.log("error update data Transmissiya: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    // this.getAllToTable();
    $('#updateModal').modal('hide');
    window.location.reload(false);
  }

  private deleteTransmissiya(){
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Transmissiya"+ '?' + $.param({"id_transmissiya": this.id_transmissiya}),
      success: function(data){
        console.log("success delete data Transmissiya: ", data);
      }, 
      error: function(data) {
        console.log("error delete data Transmissiya: ", data);
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
    this.http.get( "http://127.0.0.1:8080/diplomBackEnd/Transmissiya").subscribe(
      (data) => {
      this.transmissiyas = data;
    });
  }
 
  ngOnInit(): void {
    this.getAllToTable();
  }

  clearData(): void {
    this.id_transmissiya = null;
    this.typeDetali = null;
    this.garantiya = null;
    this.dopComment = null;
    this.cena = null;
  }
    
}
