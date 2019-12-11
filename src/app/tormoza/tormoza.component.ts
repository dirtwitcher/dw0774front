declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tormoza',
  templateUrl: './tormoza.component.html',
  styleUrls: ['./tormoza.component.css']
})

export class TormozaComponent implements OnInit {

  id_tormoza: number;
  typeDetali: string; 
  storona: string;
  proizvoditel: string;
  garantiya: string;
  dopComment: string;
  cena: number;

  userInSystem: string = 'Not Set';

  dtOptions: any = { };

  private openModal(info: any): void {
    this.id_tormoza = info.id_tormoza;
    this.typeDetali = info.typeDetali;
    this.storona = info.storona;
    this.proizvoditel = info.proizvoditel;
    this.garantiya = info.garantiya;
    this.dopComment = info.dopComment;
    this.cena = info.cena;
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient, private router: Router) {}

  private addTormoza(){
    var myData = {
      "typeDetali": this.typeDetali,
      "storona": this.storona,
      "proizvoditel": this.proizvoditel,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    var jurnalData = {
      "FIO": sessionStorage.getItem('login'),
      "tablica": "Тормоза",
      "deistvie": "Добавление - " + this.typeDetali
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Tormoza",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success post data Tormoza: ", data);
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
        console.log("error post data Tormoza: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    $('#addModal').modal('hide');
  }

  private updateTormoza(){
    var myData = {
      "id_tormoza": this.id_tormoza,
      "typeDetali": this.typeDetali,
      "storona": this.storona,
      "proizvoditel": this.proizvoditel,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    var jurnalData = {
      "FIO": sessionStorage.getItem('login'),
      "tablica": "Тормоза",
      "deistvie": "Изменение - " + this.typeDetali
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Tormoza",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success update data Tormoza: ", data);
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
        console.log("error update data Tormoza: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    $('#updateModal').modal('hide');
  }

  private deleteTormoza(){
    var jurnalData = {
      "FIO": sessionStorage.getItem('login'),
      "tablica": "Тормоза",
      "deistvie": "Удаление - " + this.typeDetali
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Tormoza"+ '?' + $.param({"id_tormoza": this.id_tormoza}),
      success: function(data){
        console.log("success delete data Tormoza: ", data);
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
        console.log("error delete data Tormoza: ", data);
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
      ajax:{url:"http://127.0.0.1:8080/diplomBackEnd/Tormoza", dataSrc:""},
      columns: [
        {title: '№ записи', data: 'id_tormoza'},
        {title: 'Тип детали', data: 'typeDetali', defaultContent:"<i>Not set</i>"},
        {title: 'Сторона', data: 'storona', defaultContent:"<i>Not set</i>"}, 
        {title: 'Производитель', data: 'proizvoditel', defaultContent:"<i>Not set</i>"},  
        {title: 'Гарантия', data: 'garantiya', defaultContent:"<i>Not set</i>"}, 
        {title: 'Комментарии', data: 'dopComment', defaultContent:"<i>Not set</i>"}, 
        {title: 'Цена', data: 'cena', defaultContent:"<i>Not set</i>"}],

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

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  clearData(): void {
    this.id_tormoza = null;
    this.typeDetali = null;
    this.storona = null;
    this.proizvoditel = null;
    this.garantiya = null;
    this.dopComment = null;
    this.cena = null;
  }
    
}