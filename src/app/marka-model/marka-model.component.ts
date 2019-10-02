import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marka-model',
  templateUrl: './marka-model.component.html',
  styleUrls: ['./marka-model.component.css']
})

export class MarkaModelComponent implements OnInit {

  constructor() { }

  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtOptions = {
      ajax: 'data/dataMarkaModel.json',
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'First name',
        data: 'firstName'
      }, {
        title: 'Last name',
        data: 'lastName'
      }]
    };
  }
}