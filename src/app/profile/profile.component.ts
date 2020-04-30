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

  id_auto: number;
  win: string;
  toplivo: string;
  privod: string;
  probeg: number;
  cvet: string;
  dopComment: string;

  dtOptions: any = { };

  private openModal(info: any): void {
    this.id_auto = info.id_auto;
    this.win = info.win;
    this.toplivo = info.toplivo;
    this.privod = info.privod;
    this.probeg = info.probeg;
    this.cvet = info.cvet;
    this.dopComment = info.dopComment;
    if ($('#updateRadio').is(':checked')) $('#updateModal').modal('show');
    if ($('#deleteRadio').is(':checked')) $('#deleteModal').modal('show');
  }

  constructor(private http: HttpClient, private router: Router, private UserNameService: UserNameService) {}

  private addAuto(){
    var myData = {
      "win": this.win,
      "toplivo": this.toplivo,
      "privod": this.privod,
      "probeg": this.probeg,
      "cvet": this.cvet,
      "dopComment": this.dopComment
    };
    var jurnalData = {
      "FIO": sessionStorage.getItem('login'),
      "tablica": "Авто в разборе",
      "deistvie": "Добавление - " + this.win
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Auto",
      data: JSON.stringify(myData),
      success: function(dataReq){
        console.log("success post data auto: ", dataReq);
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
        console.log("error post data auto: ", data);
      },
      type: "post",
      dataType: "text",
      timeout: 30000
    });
    $('#addModal').modal('hide');
  }

  private updateAuto(){
    var myData = {
      "id_auto": this.id_auto,
      "win": this.win,
      "toplivo": this.toplivo,
      "privod": this.privod,
      "probeg": this.probeg,
      "cvet": this.cvet,
      "dopComment": this.dopComment
    };
    var jurnalData = {
      "FIO": sessionStorage.getItem('login'),
      "tablica": "Авто в разборе",
      "deistvie": "Изменение - " + this.win
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Auto",
      data: JSON.stringify(myData),
      success: function(dataReq){
        console.log("success update data auto: ", dataReq);
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
        console.log("error update data auto: ", data);
      },
      type: "PUT",
      dataType: "text",
      timeout: 30000
    });
    $('#updateModal').modal('hide');
  }

  private deleteAuto(){
    var jurnalData = {
      "FIO": sessionStorage.getItem('login'),
      "tablica": "Авто в разборе",
      "deistvie": "Удаление - " + this.win
    };
    jQuery.ajax({
      url: "http://127.0.0.1:8080/diplomBackEnd/Auto"+ '?' + $.param({"id_auto": this.id_auto}),
      success: function(dataReq){
        console.log("success delete data auto: ", dataReq);
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
        console.log("error delete data auto: ", data);
      },
      type: "delete",
      dataType: "text",
      timeout: 30000
    });
    $('#deleteModal').modal('hide');
  }

  ngOnInit(): void {
    
    if (localStorage.getItem('login') === 'Вы не в системе') { this.logExit(); };

    this.http.get<getImpl>( "http://127.0.0.1:8080/dw0774/Profile"+ '?' + $.param({"id_profile": localStorage.getItem('id_profile')})).subscribe(
      (data:any) => {
          this.profLog = data.login;
          this.profPass = data.password;
          this.profFIO = data.FIO;
          this.profNumber = data.callNumber;
          this.profMail = data.email;
          // console.log(data);
      });

    /*
    this.userInSystem = sessionStorage.getItem('login');
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ajax:{url:"http://127.0.0.1:8080/diplomBackEnd/Auto", dataSrc:""},
      columns: [
        {title: '№ записи', data: 'id_auto'},
        {title: 'WIN', data: 'win', defaultContent:"<i>Not set</i>"},
        {title: 'Топливо', data: 'toplivo', defaultContent:"<i>Not set</i>"}, 
        {title: 'Привод', data: 'privod', defaultContent:"<i>Not set</i>"}, 
        {title: 'Пробег', data: 'probeg', defaultContent:"<i>Not set</i>"},
        {title: 'Цвет', data: 'cvet', defaultContent:"<i>Not set</i>"},
        {title: 'Комментарии', data: 'dopComment', defaultContent:"<i>Not set</i>"}],

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
    }; */
  }

  logExit():void{
    localStorage.setItem('login','Вы не в системе');
    localStorage.setItem('id_profile', "");
    this.UserNameService.setUserName(localStorage.getItem('login'));
    this.router.navigate(['/']);
  }

  deleteProfile():void{
    var that=this;
    jQuery.ajax({
      url: "http://127.0.0.1:8080/dw0774/Profile"+ '?' + $.param({"id_profile": localStorage.getItem('id_profile')}),
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
        url: "http://127.0.0.1:8080/dw0774/Profile",
        data: JSON.stringify(myData),
        success: function(dataReq){
          console.log("success update data profile: ", dataReq);
          this.profLog = dataReq.login;
          this.profPass = dataReq.password;
          this.profFIO = dataReq.FIO;
          this.profNumber = dataReq.callNumber;
          this.profMail = dataReq.email;
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

  clearData(): void {
    this.id_auto = null;
    this.win = null;
    this.toplivo = null;
    this.privod = null;
    this.probeg = null;
    this.cvet = null;
    this.dopComment = null;
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