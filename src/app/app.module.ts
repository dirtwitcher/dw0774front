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
import { AutoComponent } from './auto/auto.component';
import { MarkaModelComponent } from './marka-model/marka-model.component';
import { DvigatelComponent } from './dvigatel/dvigatel.component';
import { DopTovariComponent } from './dop-tovari/dop-tovari.component';
import { ElektrikaComponent } from './elektrika/elektrika.component';
import { KolesaDiskiComponent } from './kolesa-diski/kolesa-diski.component';
import { KorpusaPatrubkiComponent } from './korpusa-patrubki/korpusa-patrubki.component';
import { KppComponent } from './kpp/kpp.component';
import { KuzovnieDetaliComponent } from './kuzovnie-detali/kuzovnie-detali.component';
import { OsnaschKuzovaComponent } from './osnasch-kuzova/osnasch-kuzova.component'; 

const appRoutes: Routes = [
  {path:'', component: BodyComponent},  
  {path:'auto', component: AutoComponent},
  {path:'typeAuto', component: MarkaModelComponent},
  {path:'dvigatel', component: DvigatelComponent},
  {path:'dopTovari', component: DopTovariComponent},
  {path:'elektrika', component: ElektrikaComponent},
  {path:'kolesaDiski', component: KolesaDiskiComponent},
  {path:'korpusaPatrubki', component: KorpusaPatrubkiComponent},
  {path:'kpp', component: KppComponent},
  {path:'kuzovnieDetali', component: KuzovnieDetaliComponent},
  {path:'osnaschKuzova', component: OsnaschKuzovaComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    AutoComponent,
    MarkaModelComponent,
    DvigatelComponent,
    DopTovariComponent,
    ElektrikaComponent,
    KolesaDiskiComponent,
    KorpusaPatrubkiComponent,
    KppComponent,
    KuzovnieDetaliComponent,
    OsnaschKuzovaComponent
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
