import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
// Importar HttpClientModule
import {HttpClientModule} from '@angular/common/http';
import { MomentModule } from 'angular2-moment';

import { AppRoutingModule } from './app-routing.module';
// Carga Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserComponent } from './components/users/user.component';
import { SidebarComponent } from './components/sidebar/sidebar.componet';
import { TimeLineComponent } from './components/timeLine/timeLine.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UserComponent,
    SidebarComponent,
    TimeLineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    FormsModule,
    HttpClientModule, // cargamos el módulo en el array de imports
    MomentModule,
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
