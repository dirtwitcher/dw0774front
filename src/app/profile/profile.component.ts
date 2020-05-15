declare var $: any;

import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserNameService } from '../service/user-name-service.service';

interface getImpl{
  login : string;
  password : string;
  FIO : string;
  callNumber : string;
  email : string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  profLog : string;
  profPass : string;
  profFIO : string;
  profNumber : string;
  profMail : string;

  logNotValid : string = "";
  passNotValid : string = "";
  numberNotValid : string = "";
  mailNotValid : string = "";

  id_zakaz: string = null;
  zakazDate: string = null;
  zakazTime: string = null;
  aim: string = null;
  place: string = null;
  price: string = null;
  status: string = null;

  dtOptions: any = { };

  openModal(info: any): void {
    this.id_zakaz = info[0];
    this.aim = info[1];
    this.place = info[2];
    this.zakazDate = info[5];
    this.zakazTime = info[6];
    this.price = info[3];
    this.status = info[4];
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient, private router: Router, private UserNameService: UserNameService) {}

  updateZakaz(){
    var myData = {
      "id_zakaz": this.id_zakaz,
      "id_profile": localStorage.getItem('id_profile'),
      "aim": this.aim,
      "place": this.place,
      "zakazDate":this.zakazDate,
      "zakazTime":this.zakazTime,
      "price": this.price,
      "status": this.status
    };
    
    jQuery.ajax({
      url: "http://127.0.0.1:8080/dw0774Server/Zakaz" + "?" + $.param({"login": localStorage.getItem('login'), "password": localStorage.getItem('password')}),
      data: JSON.stringify(myData),
      success: function(dataReq){
        // console.log("success update data zakaz: ", dataReq);
        var table = $('#datatable').DataTable();
        table.ajax.reload();
      }, 
      error: function(data) {
        // console.log("error update data zakaz: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    $('#updateModal').modal('hide');
  }

  deleteZakaz(){
    jQuery.ajax({
      url: "http://127.0.0.1:8080/dw0774Server/Zakaz"+ '?' + $.param({"id_zakaz": this.id_zakaz, "login": localStorage.getItem('login'), "password": localStorage.getItem('password')}),
      success: function(dataReq){
        // console.log("success delete data zakaz: ", dataReq);
        var table = $('#datatable').DataTable();
        table.ajax.reload();
      }, 
      error: function(data) {
        // console.log("error delete data zakaz: ", data);
      },
      type: "delete",
      dataType: "text",
      timeout: 30000
    });
    $('#deleteModal').modal('hide');
  }

  ngOnInit(): void {
    
    if (localStorage.getItem('login') === 'Вы не в системе') { this.logExit(); };

    this.http.get<getImpl>( "http://127.0.0.1:8080/dw0774Server/Profile"+ '?' + $.param({"action": "profile", "id_profile": localStorage.getItem('id_profile'), "login": localStorage.getItem('login'), "password": localStorage.getItem('password')})).subscribe(
      (data:any) => {
        this.profLog = data.login;
        this.profPass = data.password;
        this.profFIO = data.FIO;
        this.profNumber = data.callNumber;
        this.profMail = data.email;
      });
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ajax:{url:"http://127.0.0.1:8080/dw0774Server/Zakaz"+ '?' + $.param({"action": "profile", "id_profile": localStorage.getItem('id_profile'), "login": localStorage.getItem('login'), "password": localStorage.getItem('password')}), dataSrc:""},
      columns: [
        {title: '#', data: [0]}, 
        {title: 'Просьба', data: [1], defaultContent:"<i>Not set</i>"}, 
        {title: 'Место', data: [2], defaultContent:"<i>Not set</i>"},
        {title: 'Дата', data: [5], defaultContent:"<i>Not set</i>"},
        {title: 'Время', data: [6], defaultContent:"<i>Not set</i>"}, 
        {title: 'Вознаграждение', data: [3], defaultContent:"<i>Not set</i>"},
        {title: 'Статус', data: [4], defaultContent:"<i>Not set</i>"}],

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
    localStorage.setItem('id_profile', "");
    localStorage.setItem('login','Вы не в системе');
    localStorage.setItem('password',"");
    this.UserNameService.setUserName(localStorage.getItem('login'));
    this.router.navigate(['/']);
  }

  deleteProfile():void{
    var that=this;
    jQuery.ajax({
      url: "http://127.0.0.1:8080/dw0774Server/Profile" + '?' + $.param({"login": localStorage.getItem('login'), "password": localStorage.getItem('password')}),
      success: function(dataReq){ 
        // console.log("success delete profile: ", dataReq);
        that.logExit();
      }, 
      error: function(data) {
        // console.log("error delete data auto: ", data);
      },
      type: "delete",
      dataType: "text",
      timeout: 30000
    });
  }

  updateProfile():void{
    if (this.logNotValid == '' && this.passNotValid == '' && this.numberNotValid == '' && this.mailNotValid == '' ){
      var myData = {
        "id_profile" : localStorage.getItem('id_profile'),
        "login" : this.profLog,
        "password" : this.profPass,
        "FIO" : this.profFIO,
        "callNumber" : this.profNumber,
        "email" : this.profMail
      };

      jQuery.ajax({
        url: "http://127.0.0.1:8080/dw0774Server/Profile" + "?" + $.param({"login": localStorage.getItem('login'), "password": localStorage.getItem('password')}),
        data: JSON.stringify(myData),
        success: function(dataReq){
          // console.log("success update data profile: ", dataReq);
          this.profLog = dataReq.login;
          this.profPass = dataReq.password;
          this.profFIO = dataReq.FIO;
          this.profNumber = dataReq.callNumber;
          this.profMail = dataReq.email;
          $("#myToast4").toast('show');
        }, 
        error: function(data) {
          // console.log("error update data profile: ", data);
        },
        type: "PUT",
        dataType: "text",
        timeout: 30000
      });
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  clearData(): void {
    this.zakazDate = null;
    this.zakazTime = null;
    this.aim = null;
    this.place = null;
    this.price = null;
    this.status = null;
  } 

  checkLoginValid(){
    if (this.profLog.length < 4){
      this.logNotValid = " * Ваш логин должен составлять 4-25 символов."
    } else {
      this.logNotValid = "";
    }
  }

  checkPassValid(){
    if (this.profPass.length < 8){
      this.passNotValid = " * Ваш пароль должен составлять 8-25 символов."
    } else {
      this.passNotValid = "";
    }
  }

  checkNumberValid(){
    if (this.profNumber.length < 9){
      this.numberNotValid = " * Пожалуйста, укажите Ваш номер телефона в формате (12) 345-67-89"
    } else {
      this.numberNotValid = "";
    }
  }

  checkMailValid(){
    if (this.profMail.length < 1){
      this.mailNotValid = " * Пожалуйста, укажите Ваш профиль в соц сети."
    } else {
      this.mailNotValid = "";
    }
  }

}