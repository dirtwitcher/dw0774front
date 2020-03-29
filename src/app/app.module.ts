import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; // connect forms
import { Routes, RouterModule } from '@angular/router'; //connect routes
import { HttpClientModule } from '@angular/common/http';//http connect

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; //connect bootstrap
import { DataTablesModule } from 'angular-datatables'; // connect dat atable

import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { ZakazComponent } from './zakaz/zakaz.component';
import { JurnalComponent } from './jurnal/jurnal.component'; 

const appRoutes: Routes = [
  {path:'', component: BodyComponent},  
  {path:'profile', component: ProfileComponent},
  {path:'zakaz', component: ZakazComponent},
  {path:'jurnal', component: JurnalComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    ProfileComponent,
    ZakazComponent,
    JurnalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, //connect forms
    HttpClientModule, //connect http
    AppRoutingModule,
    NgbModule.forRoot(), //connect bootstrap
    RouterModule.forRoot(appRoutes), //connect routes
    DataTablesModule // datatable
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
