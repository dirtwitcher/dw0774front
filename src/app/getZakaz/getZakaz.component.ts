declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getZakaz',
  templateUrl: './getZakaz.component.html',
  styleUrls: ['./getZakaz.component.css']
})

export class GetZakazComponent implements OnInit {

  userInSystem: string = 'Not Set';

  dtOptions: any = { };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('login') === 'Not Set') { this.logExit(); };
    this.userInSystem = sessionStorage.getItem('login');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ajax:{url:"http://127.0.0.1:8080/diplomBackEnd/Jurnal", dataSrc:""},
      columns: [
        {title: '№ записи', data: 'id_jurnal'},
        {title: 'Логин', data: 'FIO', defaultContent:"<i>Not set</i>"},
        {title: 'Таблица', data: 'tablica', defaultContent:"<i>Not set</i>"}, 
        {title: 'Действие', data: 'deistvie', defaultContent:"<i>Not set</i>"}], 

      dom: 'Bfrtip',
      buttons: [
        'colvis',
        'copy',
        'print',
        'excel'
      ],

    };
  }

  logExit():void{
    this.userInSystem = 'Not Set';
    sessionStorage.setItem('login','Not Set');
    this.router.navigate(['/']);
  }

}