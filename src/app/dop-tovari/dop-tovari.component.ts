declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dop-tovari',
  templateUrl: './dop-tovari.component.html',
  styleUrls: ['./dop-tovari.component.css']
})

export class DopTovariComponent implements OnInit {

  private dopTovars: any = [];
  private polzovatel: String = "!NONE!";

  id_dopTovari: number;
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
    this.id_dopTovari = info[0];
    this.typeDetali = info[1];
    this.garantiya = info[2];
    this.dopComment = info[3];
    this.cena = info[4];
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient) {}

  private addDopTovari(){
    var myData = {
      "typeDetali": this.typeDetali,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/DopTovari",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success post data DopTovari: ", data);
      }, 
      error: function(data) {
        console.log("error post data DopTovari: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    // this.getAllToTable();
    $('#addModal').modal('hide');
    window.location.reload(false);
  }

  private updateDopTovari(){
    var myData = {
      "id_dopTovari": this.id_dopTovari,
      "typeDetali": this.typeDetali,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/DopTovari",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success update data DopTovari: ", data);
      }, 
      error: function(data) {
        console.log("error update data DopTovari: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    // this.getAllToTable();
    $('#updateModal').modal('hide');
    window.location.reload(false);
  }

  private deleteDopTovari(){
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/DopTovari"+ '?' + $.param({"id_dopTovari": this.id_dopTovari}),
      success: function(data){
        console.log("success delete data DopTovari: ", data);
      }, 
      error: function(data) {
        console.log("error delete data DopTovari: ", data);
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
    this.http.get( "http://127.0.0.1:8080/diplomBackEnd/DopTovari").subscribe(
      (data) => {
      this.dopTovars = data;
    });
  }
 
  ngOnInit(): void {
    this.getAllToTable();
  }

  clearData(): void {
    this.id_dopTovari = null;
    this.typeDetali = null;
    this.garantiya = null;
    this.dopComment = null;
    this.cena = null;
  }
    
}
