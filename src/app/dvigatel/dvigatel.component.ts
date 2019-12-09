declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dvigatel',
  templateUrl: './dvigatel.component.html',
  styleUrls: ['./dvigatel.component.css']
})

export class DvigatelComponent implements OnInit {

  id_dvigatel: number;
  obem: string;
  garantiya: string;
  dopComment: string;
  cena: number;

  userInSystem: string = 'Not Set';

  dtOptions: any = { };

  private openModal(info: any): void {
    this.id_dvigatel = info[0];
    this.obem = info[1];
    this.garantiya = info[2];
    this.dopComment = info[3];
    this.cena = info[4];
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient, private router: Router) {}

  private addDvigatel(){
    var myData = {
      "obem": this.obem,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    var jurnalData = {
      "FIO": sessionStorage.getItem('login'),
      "tablica": "Двигатель и запчасти",
      "deistvie": "Добавление - " + this.dopComment
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Dvigatel",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success post data dvigatel: ", data);
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
        console.log("error post data dvigatel: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    $('#addModal').modal('hide');
  }

  private updateDvigatel(){
    var myData = {
      "id_dvigatel": this.id_dvigatel,
      "obem": this.obem,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    var jurnalData = {
      "FIO": sessionStorage.getItem('login'),
      "tablica": "Двигатель и запчасти",
      "deistvie": "Изменение - " + this.dopComment
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Dvigatel",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success update data dvigatel: ", data);
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
        console.log("error update data dvigatel: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    $('#updateModal').modal('hide');
  }

  private deleteDvigatel(){
    var jurnalData = {
      "FIO": sessionStorage.getItem('login'),
      "tablica": "Двигатель и запчасти",
      "deistvie": "Удаление - " + this.dopComment
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Dvigatel"+ '?' + $.param({"id_dvigatel": this.id_dvigatel}),
      success: function(data){
        console.log("success delete data dvigatel: ", data);
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
        console.log("error delete data dvigatel: ", data);
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
      ajax:{url:"http://127.0.0.1:8080/diplomBackEnd/Dvigatel", dataSrc:""},
      columns: [
        {title: '№ записи', data: 'id_dvigatel'},
        {title: 'Объём', data: 'obem', defaultContent:"<i>Not set</i>"},
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

  clearData(): void {
    this.id_dvigatel = null;
    this.obem = null;
    this.garantiya = null;
    this.dopComment = null;
    this.cena = null;
  }
    
}