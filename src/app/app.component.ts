import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    // console.log(localStorage.getItem('login'));
    if (localStorage.getItem('login') == null){
      localStorage.setItem('login','Вы не в системе');
    }
  }

}