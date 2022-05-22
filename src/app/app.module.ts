import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from "./app-routing.module"
import { NgZorroAntdModule } from "ng-zorro-antd"
import { NzIconModule } from 'ng-zorro-antd/icon';
//组件导入
import { SetupComponent } from './pages/setup/setup.component';
import { MainComponent } from './pages/main/main.component';
import { LeftControlComponent } from './pages/main/left-control/left-control.component';


registerLocaleData(zh);

@NgModule({
  declarations: [
	AppComponent,
	SetupComponent,
	MainComponent,
	LeftControlComponent
 ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
	BrowserAnimationsModule,
	AppRoutingModule,
	NgZorroAntdModule,
	NzIconModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
