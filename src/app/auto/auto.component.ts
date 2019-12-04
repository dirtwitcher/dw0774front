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

  id_auto: number;
  win: string;
  toplivo: string;
  privod: string;
  probeg: number;
  cvet: string;
  dopComment: string;

  dtOptions: DataTables.Settings = { };

  private openModal(info: any): void {

    console.log("log ", info);

    this.id_auto = info.id_auto;
    this.win = info.win;
    this.toplivo = info.toplivo;
    this.privod = info.privod;
    this.probeg = info.probeg;
    this.cvet = info.cvet;
    this.dopComment = info.dopComment;
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
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
      success: function(dataReq){
        console.log("success post data auto: ", dataReq);
        var table = $('#datatable').DataTable();
        table.ajax.reload();
      },
      error: function(data) {
        console.log("error post data auto: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    $('#addModal').modal('hide');
  }

  private updateAuto(){
    var myData = {
      "id_auto": this.id_auto,
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
      success: function(dataReq){
        console.log("success update data auto: ", dataReq);
        var table = $('#datatable').DataTable();
        table.ajax.reload();
      }, 
      error: function(data) {
        console.log("error update data auto: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    $('#updateModal').modal('hide');
  }

  private deleteAuto(){
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Auto"+ '?' + $.param({"id_auto": this.id_auto}),
      success: function(dataReq){
        console.log("success delete data auto: ", dataReq);
        var table = $('#datatable').DataTable();
        table.ajax.reload();
      }, 
      error: function(data) {
        console.log("error delete data auto: ", data);
      },
      type: "delete",
      dataType: "text",
      timeout: 30000
    });
    $('#deleteModal').modal('hide');
  }
 
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ajax:{url:"http://127.0.0.1:8080/diplomBackEnd/Auto", dataSrc:""},
      columns: [
        {title: 'id_auto', data: 'id_auto'},
        {title: 'win', data: 'win', defaultContent:"<i>Not set</i>"},
        {title: 'toplivo', data: 'toplivo', defaultContent:"<i>Not set</i>"}, 
        {title: 'privod', data: 'privod', defaultContent:"<i>Not set</i>"}, 
        {title: 'probeg', data: 'probeg', defaultContent:"<i>Not set</i>"},
        {title: 'cvet', data: 'cvet', defaultContent:"<i>Not set</i>"},
        {title: 'dopComment', data: 'dopComment', defaultContent:"<i>Not set</i>"}],

      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          this.openModal(data);
        });
          return row;
      }
    };
  }

  clearData(): void {
    this.id_auto = null;
    this.win = null;
    this.toplivo = null;
    this.privod = null;
    this.probeg = null;
    this.cvet = null;
    this.dopComment = null;
  }

}