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

  private profLog : string;
  private profPass : string;
  private profFIO : string;
  private profNumber : string;
  private profMail : string;

  private logNotValid : string = "";
  private passNotValid : string = "";
  private numberNotValid : string = "";
  private mailNotValid : string = "";

  private id_profile: string = localStorage.getItem('id_profile');
  private zakazDate: string = null;
  private zakazTime: string = null;
  private aim: string = null;
  private place: string = null;
  private price: string = null;
  private status: string = null;

  dtOptions: any = { };

  private openModal(info: any): void {
    this.zakazDate = info.zakazDate;
    this.zakazTime = info.zakazTime;
    this.aim = info.aim;
    this.place = info.place;
    this.price = info.price;
    this.status = info.status;
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient, private router: Router, private UserNameService: UserNameService) {}

  private updateZakaz(){
    var myData = {
      "id_profile": this.id_profile,
      "aim": this.aim,
      "place": this.place,
      "zakazDate":this.zakazDate,
      "zakazTime":this.zakazTime,
      "price": this.price,
      "status": this.status
    };
    
    jQuery.ajax({
      url: "http://127.0.0.1:8080/dw0774/Zakaz",
      data: JSON.stringify(myData),
      success: function(dataReq){
        console.log("success update data zakaz: ", dataReq);
        var table = $('#datatable').DataTable();
        table.ajax.reload();
      }, 
      error: function(data) {
        console.log("error update data zakaz: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    $('#updateModal').modal('hide');
  }

  private deleteZakaz(){
    var jurnalData = {
      "id_profile": this.id_profile,
      "aim": this.aim,
      "place": this.place,
      "zakazDate":this.zakazDate,
      "zakazTime":this.zakazTime,
      "price": this.price,
      "status": this.status
    };

    jQuery.ajax({
      url: "http://127.0.0.1:8080/dw0774/Zakaz"+ '?' + $.param({"id_profile": this.id_profile}),
      success: function(dataReq){
        console.log("success delete data zakaz: ", dataReq);
        var table = $('#datatable').DataTable();
        table.ajax.reload();
      }, 
      error: function(data) {
        console.log("error delete data zakaz: ", data);
      },
      type: "delete",
      dataType: "text",
      timeout: 30000
    });
    $('#deleteModal').modal('hide');
  }

  ngOnInit(): void {
    
    if (localStorage.getItem('login') === 'Вы не в системе') { this.logExit(); };

    this.http.get<getImpl>( "http://127.0.0.1:8080/dw0774/Profile"+ '?' + $.param({"id_profile": this.id_profile})).subscribe(
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
      ajax:{url:"http://127.0.0.1:8080/dw0774/Zakaz", dataSrc:""},
      columns: [
        {title: 'Просьба', data: 'aim', defaultContent:"<i>Not set</i>"}, 
        {title: 'Место', data: 'place', defaultContent:"<i>Not set</i>"},
        {title: 'Дата', data: 'zakazDate', defaultContent:"<i>Not set</i>"},
        {title: 'Время', data: 'zakazTime', defaultContent:"<i>Not set</i>"}, 
        {title: 'Вознаграждение', data: 'price', defaultContent:"<i>Not set</i>"},
        {title: 'Статус', data: 'status', defaultContent:"<i>Not set</i>"}],

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

  private logExit():void{
    localStorage.setItem('login','Вы не в системе');
    localStorage.setItem('id_profile', "");
    this.UserNameService.setUserName(localStorage.getItem('login'));
    this.router.navigate(['/']);
  }

  private deleteProfile():void{
    var that=this;
    jQuery.ajax({
      url: "http://127.0.0.1:8080/dw0774/Profile"+ '?' + $.param({"id_profile": this.id_profile}),
      success: function(dataReq){ 
        console.log("success delete profile: ", dataReq);
        that.logExit();
      }, 
      error: function(data) {
        console.log("error delete data auto: ", data);
      },
      type: "delete",
      dataType: "text",
      timeout: 30000
    });
  }

  private updateProfile():void{
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
        url: "http://127.0.0.1:8080/dw0774/Profile",
        data: JSON.stringify(myData),
        success: function(dataReq){
          console.log("success update data profile: ", dataReq);
          this.profLog = dataReq.login;
          this.profPass = dataReq.password;
          this.profFIO = dataReq.FIO;
          this.profNumber = dataReq.callNumber;
          this.profMail = dataReq.email;
          $("#myToast4").toast('show');
        }, 
        error: function(data) {
          console.log("error update data profile: ", data);
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

  private clearData(): void {
    this.zakazDate = null;
    this.zakazTime = null;
    this.aim = null;
    this.place = null;
    this.price = null;
    this.status = null;
  } 

  private checkLoginValid(){
    if (this.profLog.length < 4){
      this.logNotValid = " * Ваш логин должен составлять 4-25 символов."
    } else {
      this.logNotValid = "";
    }
  }

  private checkPassValid(){
    if (this.profPass.length < 8){
      this.passNotValid = " * Ваш пароль должен составлять 8-25 символов."
    } else {
      this.passNotValid = "";
    }
  }

  private checkNumberValid(){
    if (this.profNumber.length < 9){
      this.numberNotValid = " * Пожалуйста, укажите Ваш номер телефона в формате (12) 345-67-89"
    } else {
      this.numberNotValid = "";
    }
  }

  private checkMailValid(){
    if (this.profMail.length < 1){
      this.mailNotValid = " * Пожалуйста, укажите Ваш профиль в соц сети."
    } else {
      this.mailNotValid = "";
    }
  }

}