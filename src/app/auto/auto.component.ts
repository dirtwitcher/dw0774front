import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

class Auto {
  win: string;
  toplivo: string;
  privod: string;
  probeg: number;
  cvet: string;
  dopComment: string;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})

export class AutoComponent implements OnInit {

  win: string;
  toplivo: string;
  privod: string;
  probeg: number;
  cvet: string;
  dopComment: string;

  dtOptions: DataTables.Settings = {} ;
  autos: Auto[];

  constructor(private http: HttpClient) {}

  addAuto(){

    var myData = {"win": this.win,
    "toplivo": this.toplivo,
    "privod": this.privod,
    "probeg": this.probeg,
    "cvet": this.cvet,
    "dopComment": this.dopComment
    };        
    jQuery.ajax({
        url: "http://127.0.0.1:8080/diplomBackEnd/Auto",
        data: JSON.stringify(myData),
        success: function(){
            console.log(JSON.stringify(myData));
        },
        error: function(data) {
            console.log("Error: ", data);
        },
        type: "post",
        timeout: 30000
    });

/*
    console.log( this.win + ' ' + this.toplivo + ' ' + this.privod + ' ' + this.probeg + ' ' + this.cvet + ' ' + this.dopComment);
    this.http.post('http://127.0.0.1:8080/diplomBackEnd/Auto', {
      'win': this.win,
      'toplivo': this.toplivo,
      'privod': this.privod,
      'probeg': this.probeg,
      'cvet': this.cvet,
      'dopComment': this.dopComment
    });
    */
  }

  ngOnInit(): void {
  /*  const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            'http://localhost:8080/diplomBackEnd/Auto',
            dataTablesParameters, {}
          ).subscribe(resp => {
            that.autos = resp.data;

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [{ data: 'win' }, { data: 'toplivo' }, { data: 'privod' }, 
                { data: 'probeg' }, { data: 'cvet' }, { data: 'dopComment' }]
    };*/
  }
}