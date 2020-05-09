declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface zakazProfileImpl{
  profFIO : string;
  profNumber : string;
  profMail : string;

  zakazDate: string;
  zakazTime: string;
  aim: string;
  place: string;
  price: string;
  status: string;
}

@Component({
  selector: 'app-getZakaz',
  templateUrl: './getZakaz.component.html',
  styleUrls: ['./getZakaz.component.css']
})

export class GetZakazComponent implements OnInit {
  
  cards = [
    {
      aim: 'Оцените проект',
      place: 'Минск, Уручье',
      zakazDate: '2020-05-09',
      zakazTime: '12:00',
      price: 'Спасибо',
      status: 'Пишу, что хочу, потому-что могу :)',
      profFIO: 'Биркос Владислав',
      profNumber: '(29) 119-07-74',
      profMail: 'email@yandex.ru',
    },
  ];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<zakazProfileImpl>( "http://127.0.0.1:8080/dw0774/Zakaz").subscribe(
      (data:any) => {
        data.forEach(element => {
          this.cards.push({
            profFIO: element[0],
            profNumber: element[1],
            profMail: element[2],
            aim: element[3],
            place: element[4],
            price: element[5],
            status: element[6],
            zakazDate: element[7],
            zakazTime: element[8],
          })
        });
      }
    )
  }

}