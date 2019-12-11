declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otoplenie-kondei',
  templateUrl: './otoplenie-kondei.component.html',
  styleUrls: ['./otoplenie-kondei.component.css']
})

export class OtoplenieKondeiComponent implements OnInit {

  id_otoplenieKondei: number;
  typeDetali: string; 
  material: string;
  proizvoditel: string;
  garantiya: string;
  dopComment: string;
  cena: number;

  userInSystem: string = 'Not Set';

  dtOptions: any = { };

  private openModal(info: any): void {
    this.id_otoplenieKondei = info.id_otoplenieKondei;
    this.typeDetali = info.typeDetali;
    this.material = info.material;
    this.proizvoditel = info.proizvoditel;
    this.garantiya = info.garantiya;
    this.dopComment = info.dopComment;
    this.cena = info.cena;
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient, private router: Router) {}

  private addOtoplenieKondei(){
    var myData = {
      "typeDetali": this.typeDetali,
      "material": this.material,
      "proizvoditel": this.proizvoditel,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    var jurnalData = {
      "FIO": sessionStorage.getItem('login'),
      "tablica": "Отопление и кондиционер",
      "deistvie": "Добавление - " + this.typeDetali
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/OtoplenieKondei",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success post data OtoplenieKondei: ", data);
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
        console.log("error post data OtoplenieKondei: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    $('#addModal').modal('hide');
  }

  private updateOtoplenieKondei(){
    var myData = {
      "id_otoplenieKondei": this.id_otoplenieKondei,
      "typeDetali": this.typeDetali,
      "material": this.material,
      "proizvoditel": this.proizvoditel,
      "garantiya": this.garantiya,
      "dopComment": this.dopComment,
      "cena": this.cena
    };
    var jurnalData = {
      "FIO": sessionStorage.getItem('login'),
      "tablica": "Отопление и кондиционер",
      "deistvie": "Изменение - " + this.typeDetali
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/OtoplenieKondei",
      data: JSON.stringify(myData),
      success: function(data){
        console.log("success update data OtoplenieKondei: ", data);
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
        console.log("error update data OtoplenieKondei: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    $('#updateModal').modal('hide');
  }

  private deleteOtoplenieKondei(){
    var jurnalData = {
      "FIO": sessionStorage.getItem('login'),
      "tablica": "Отопление и кондиционер",
      "deistvie": "Удаление - " + this.typeDetali
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/OtoplenieKondei"+ '?' + $.param({"id_otoplenieKondei": this.id_otoplenieKondei}),
      success: function(data){
        console.log("success delete data OtoplenieKondei: ", data);
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
        console.log("error delete data OtoplenieKondei: ", data);
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
      ajax:{url:"http://127.0.0.1:8080/diplomBackEnd/OtoplenieKondei", dataSrc:""},
      columns: [
        {title: '№ записи', data: 'id_otoplenieKondei'},
        {title: 'Тип детали', data: 'typeDetali', defaultContent:"<i>Not set</i>"},
        {title: 'Материал', data: 'material', defaultContent:"<i>Not set</i>"}, 
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
    this.id_otoplenieKondei = null;
    this.typeDetali = null;
    this.material = null;
    this.proizvoditel = null;
    this.garantiya = null;
    this.dopComment = null;
    this.cena = null;
  }
    
}