declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marka-model',
  templateUrl: './marka-model.component.html',
  styleUrls: ['./marka-model.component.css']
})

export class MarkaModelComponent implements OnInit {

  id_typeAuto: number;
  marka: string;
  model: string;

  userInSystem: string = 'Not Set';

  dtOptions: any = { };

  private openModal(info: any): void {
    this.id_typeAuto = info.id_typeAuto;
    this.marka = info.marka;
    this.model = info.model;
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient, private router: Router) {}

  private addTypeAuto(){
    var myData = {
      "marka": this.marka,
      "model": this.model,
    };
    var jurnalData = {
      "FIO": sessionStorage.getItem('login'),
      "tablica": "Марка, модель",
      "deistvie": "Добавление - " + this.model
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/TypeAuto",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success post data marka model: ", data);
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
        console.log("error post data marka model: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    $('#addModal').modal('hide');
  }

  private updateTypeAuto(){
    var myData = {
      "id_typeAuto": this.id_typeAuto,
      "marka": this.marka,
      "model": this.model,
    };
    var jurnalData = {
      "FIO": sessionStorage.getItem('login'),
      "tablica": "Марка, модель",
      "deistvie": "Изменение - " + this.model
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/TypeAuto",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success update data marka model: ", data);
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
        console.log("error update data marka model: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    $('#updateModal').modal('hide');
  }

  private deleteTypeAuto(){
    var jurnalData = {
      "FIO": sessionStorage.getItem('login'),
      "tablica": "Марка, модель",
      "deistvie": "Удаление - " + this.model
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/TypeAuto"+ '?' + $.param({"id_typeAuto": this.id_typeAuto}),
      success: function(data){
        console.log("success delete data marka model: ", data);
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
        console.log("error delete data marka model: ", data);
      },
      type: "delete",
      dataType: "text",
      timeout: 30000
    });
    $('#deleteModal').modal('hide');
  }
 
  ngOnInit(): void {
    if (sessionStorage.getItem('login') === 'Not Set') { this.logExit(); };
    this.userInSystem = sessionStorage.getItem('login');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ajax:{url:"http://127.0.0.1:8080/diplomBackEnd/TypeAuto", dataSrc:""},
      columns: [
        {title: '№ записи', data: 'id_typeAuto'},
        {title: 'Марка', data: 'marka', defaultContent:"<i>Not set</i>"},
        {title: 'Модель', data: 'model', defaultContent:"<i>Not set</i>"}],

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
    this.userInSystem = 'Not Set';
    sessionStorage.setItem('login','Not Set');
    this.router.navigate(['/']);
  }

  clearData(): void {
    this.id_typeAuto = null;
    this.marka = null;
    this.model = null;
  }
    
}