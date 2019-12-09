declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-polzovatel',
  templateUrl: './polzovatel.component.html',
  styleUrls: ['./polzovatel.component.css']
})

export class PolzovatelComponent implements OnInit {

  userInSystem: string = 'Not Set';

  dtOptions: any = { };

  constructor(private http: HttpClient, private router: Router) {}
 
  ngOnInit(): void {
    if (sessionStorage.getItem('login') === 'Not Set') { this.logExit(); };
    this.userInSystem = sessionStorage.getItem('login');
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ajax:{url:"http://127.0.0.1:8080/diplomBackEnd/Polzovatel", dataSrc:""},
      columns: [
        {title: '№ записи', data: 'id_polzovatel'},
        {title: 'Логин', data: 'login', defaultContent:"<i>Not set</i>"}],

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