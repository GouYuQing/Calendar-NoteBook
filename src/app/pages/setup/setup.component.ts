import { INIT_FLAG, START_USING_DATE, USERNAME } from './../../services/local-stroage.namespace';
import { LocalStroageService } from './../../services/local-stroage.service';
import { Component, OnInit } from '@angular/core';
import { getTodayTime } from 'src/utils/time';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
	public username: string = "";
	constructor(
		private store: LocalStroageService
	  ) { }

  	ngOnInit(): void {
  	}
	  
	public handleCompleteSetup(): void { 
		this.store.set(INIT_FLAG, true);
		this.store.set(START_USING_DATE, getTodayTime());
		this.store.set(USERNAME, this.username)
	}
}
