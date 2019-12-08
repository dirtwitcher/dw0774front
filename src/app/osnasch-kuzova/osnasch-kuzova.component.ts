declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-osnasch-kuzova',
  templateUrl: './osnasch-kuzova.component.html',
  styleUrls: ['./osnasch-kuzova.component.css']
})

export class OsnaschKuzovaComponent implements OnInit {

  id_osnaschKuzova: number;
  typeDetali: string; 
  storona: string;
  garantiya: string;
  dopComment: string;
  cena: number;

  userInSystem: string = 'Not Set';

  dtOptions: any = { };

  private openModal(info: any): void {
    this.id_osnaschKuzova = info[0];
    this.typeDetali = info[1];
    this.storona = info[2];
    this.garantiya = info[3];
    this.dopComment = info[4];
    this.cena = info[5];
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient, private router: Router) {}

  private addOsnaschKuzova(){
    var myData = {
      "typeDetali": this.typeDetali,
      "storona": this.storona,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    var jurnalData = {
      "FIO": sessionStorage.getItem('login'),
      "tablica": "Оснащение кузова",
      "deistvie": "Добавление - " + this.typeDetali
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/OsnaschKuzova",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success post data OsnaschKuzova: ", data);
        var table = $('#datatable').DataTable();
        table.ajax.reload();

        jQuery.ajax({
          url: "http://127.0.0.1:8080/diplomBackEnd/Jurnal",
          data: JSON.stringify(jurnalData),
          type: "post",
          dataType: "text",
          timeout: 30000
        });

      }, 
      error: function(data) {
        console.log("error post data OsnaschKuzova: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    $('#addModal').modal('hide');
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
    var jurnalData = {
      "FIO": sessionStorage.getItem('login'),
      "tablica": "Оснащение кузова",
      "deistvie": "Изменение - " + this.typeDetali
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/OsnaschKuzova",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success update data OsnaschKuzova: ", data);
        var table = $('#datatable').DataTable();
        table.ajax.reload();

        jQuery.ajax({
          url: "http://127.0.0.1:8080/diplomBackEnd/Jurnal",
          data: JSON.stringify(jurnalData),
          type: "post",
          dataType: "text",
          timeout: 30000
        });

      }, 
      error: function(data) {
        console.log("error update data OsnaschKuzova: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    $('#updateModal').modal('hide');
  }

  private deleteOsnaschKuzova(){
    var jurnalData = {
      "FIO": sessionStorage.getItem('login'),
      "tablica": "Оснащение кузова",
      "deistvie": "Удаление - " + this.typeDetali
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/OsnaschKuzova"+ '?' + $.param({"id_osnaschKuzova": this.id_osnaschKuzova}),
      success: function(data){
        console.log("success delete data OsnaschKuzova: ", data);
        var table = $('#datatable').DataTable();
        table.ajax.reload();

        jQuery.ajax({
          url: "http://127.0.0.1:8080/diplomBackEnd/Jurnal",
          data: JSON.stringify(jurnalData),
          type: "post",
          dataType: "text",
          timeout: 30000
        });

      }, 
      error: function(data) {
        console.log("error delete data OsnaschKuzova: ", data);
      },
      type: "delete",
      dataType: "text",
      timeout: 30000
    });
    $('#deleteModal').modal('hide');
  }

  ngOnInit(): void {
    this.userInSystem = sessionStorage.getItem('login');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ajax:{url:"http://127.0.0.1:8080/diplomBackEnd/Auto", dataSrc:""},
      columns: [
        {title: '№ записи', data: 'id_auto'},
        {title: 'WIN', data: 'win', defaultContent:"<i>Not set</i>"},
        {title: 'Топливо', data: 'toplivo', defaultContent:"<i>Not set</i>"}, 
        {title: 'Привод', data: 'privod', defaultContent:"<i>Not set</i>"}, 
        {title: 'Пробег', data: 'probeg', defaultContent:"<i>Not set</i>"},
        {title: 'Цвет', data: 'cvet', defaultContent:"<i>Not set</i>"},
        {title: 'Комментарии', data: 'dopComment', defaultContent:"<i>Not set</i>"}],

      dom: 'Bfrtip',
      buttons: [
        'colvis',
        'copy',
        'print',
        'excel'
      ],

      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          this.openModal(data);
        });
          return row;
      }
    };
  }

  logExit():void{
    sessionStorage.setItem('login','Not Set');
    this.router.navigate(['/']);
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