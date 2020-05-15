import { Component, OnInit } from '@angular/core';
import ymaps from 'ymaps';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    ymaps
    .load('https://api-maps.yandex.ru/2.1/?lang=ru_RU')
    .then(maps => {
      const map = new maps.Map('YMapsID', {
        center: [53.902512, 27.561481],
        zoom: 3
      });
    })
    .catch(error => console.log('Failed to load Yandex Maps', error));

  }

}
