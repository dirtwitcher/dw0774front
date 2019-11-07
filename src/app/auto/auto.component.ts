import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export class Auto {
  win: string;
  toplivo: string;
  privod: string;
  probeg: number;
  cvet: string;
  dopComment: string;
}

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})

export class AutoComponent implements OnInit {

  private autos: any = [];

  win: string;
  toplivo: string;
  privod: string;
  probeg: number;
  cvet: string;
  dopComment: string;

  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 25,
    processing: true,
  };

  constructor(private http: HttpClient) {}

  addAuto(){
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
  }

  getAllToTable():void{
    this.http.get( "http://127.0.0.1:8080/diplomBackEnd/Auto").subscribe(
      (data) => {
      this.autos= data;
    });
  }
 
  ngOnInit(): void {
   this.getAllToTable();
  }
    
}