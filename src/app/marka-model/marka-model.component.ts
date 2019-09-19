import { Component, OnInit } from '@angular/core';
import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-marka-model',
  templateUrl: './marka-model.component.html',
  styleUrls: ['./marka-model.component.css']
})

@Injectable()
class markaModel{
  id: number;
  marka: string;
  model: string;

  constructor(private http: HttpClient) {}

  getCar() {
    return this.http.get('/api/user')
      .map((res: Response) => res.json().response);
  } 
}

export class MarkaModelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
