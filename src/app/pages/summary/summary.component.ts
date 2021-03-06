import { Summary } from './../../../domain/entities';
import { getTodayTime, ONE_DAY } from './../../../utils/time';
import { USERNAME, START_USING_DATE } from './../../services/local-stroage.namespace';
import { LocalStroageService } from './../../services/local-stroage.service';
import { Component, OnInit } from '@angular/core';
import { SummaryService } from './summary.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
	public username: string = this.store.get(USERNAME) || "username";
	public dateCount = Math.floor((getTodayTime() - this.store.get(START_USING_DATE)) / ONE_DAY + 1);
	constructor(
		private summaryService: SummaryService,
		private store: LocalStroageService,
		private router: Router,
		private noto: NzNotificationService
  ) { }

	ngOnInit(): void {
		this.summaryService.doSummary();
	}
	
	public requestForDate(date: Date): Summary | null { 
		return this.summaryService.summaryForDate(date.getTime());
	}

	public showSummaryDetail(summary: Summary): void { 
		if (!summary) { return; }
		const { cCount, uCount } = summary;
		if (uCount) {
			this.noto.error('有未完成的项目', `你完成了全部任务的 ${cCount / (cCount + uCount)}%`);
		  } else if (cCount) {
			this.noto.success('完成了这一天的全部任务', '干得漂亮');
		  }
	}

	public goBack(): void { 
		this.router.navigateByUrl("/main");
	}

}
