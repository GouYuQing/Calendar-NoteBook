import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LeftControlComponent } from './left-control/left-control.component';



@NgModule({
  declarations: [
    MainComponent,
    LeftControlComponent
  ],
  imports: [
	  CommonModule,
	  NgZorroAntdModule,
	  
  ]
})
export class MainModule { }
