import { RankBy } from './../../../../../domain/entities';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListService } from 'src/app/services/list/list.service';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	private listTitle$: Subscription;
	public listTitle: string = "";
	public completedHide: boolean = false
	constructor(
		private listService: ListService,
		private todoService: TodoService
	  ) { }

	ngOnInit(): void {
		this.listTitle$ = this.listService.current$.subscribe(list => {
			this.listTitle = list ? list.title : "";
		});
	}
	
	public switchRankType(str: RankBy): void { 
		this.todoService.toggleRank(str)
	}

	public toggleCompletedHide(): void { 
		
	}

}
