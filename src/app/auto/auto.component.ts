declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})

export class AutoComponent implements OnInit {

  private autos: any = [];
  private polzovatel: String = "!NONE!";

  id: number;
  win: string;
  toplivo: string;
  privod: string;
  probeg: number;
  cvet: string;
  dopComment: string;

  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    // processing: true,

    rowCallback: (row: Node, data: any[] | Object, index: number) => {
      $('td', row).unbind('click');
      $('td', row).bind('click', () => {
        this.dataToObject(data);
      });
        return row;
    }
    
  };

  private dataToObject(info: any): void {
    this.id = info[0];
    this.win = info[1];
    this.toplivo = info[2];
    this.privod = info[3];
    this.probeg = info[4];
    this.cvet = info[5];
    this.dopComment = info[6];
    $('#updateDeleteModal').modal('show');
  }

  constructor(private http: HttpClient) {}

  private addAuto(){
    var myData = {
      "win": this.win,
      "toplivo": this.toplivo,
      "privod": this.privod,
      "probeg": this.probeg,
      "cvet": this.cvet,
      "dopComment": this.dopComment
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Auto",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success post data auto: ", data);
      }, 
      error: function(data) {
        console.log("error post data auto: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    this.getAllToTable();
    $('#addModal').modal('hide');
    window.location.reload(false);
  }

  private updateAuto(){
    var myData = {
      "id": this.id,
      "win": this.win,
      "toplivo": this.toplivo,
      "privod": this.privod,
      "probeg": this.probeg,
      "cvet": this.cvet,
      "dopComment": this.dopComment
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Auto",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success update data auto: ", data);
      }, 
      error: function(data) {
        console.log("error update data auto: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    // this.getAllToTable();
    // $('#updateDeleteModal').modal('hide');
    // window.location.reload(false);
  }

  private deleteAuto(){
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Auto"+ '?' + $.param({"id": this.id}),
      success: function(data){
        console.log("success delete data auto: ", data);
      }, 
      error: function(data) {
        console.log("error delete data auto: ", data);
      },
      type: "delete",
      dataType: "text",
      timeout: 30000
    });
    this.getAllToTable();
    $('#updateDeleteModal').modal('hide');
    window.location.reload(false);
  }

  private getAllToTable(): void {
    this.http.get( "http://127.0.0.1:8080/diplomBackEnd/Auto").subscribe(
      (data) => {
      this.autos = data;
    });
  }
 
  ngOnInit(): void {
   this.getAllToTable();
  }

  clearData(): void {
    this.id = null;
    this.win = null;
    this.toplivo = null;
    this.privod = null;
    this.probeg = null;
    this.cvet = null;
    this.dopComment = null;
  }
    
}