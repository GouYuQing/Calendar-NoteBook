import { floorToMinute, getCurrentTime } from './../../../../utils/time';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { first } from 'rxjs/operators';
import { TodoService } from 'src/app/services/todo/todo.service';
import { Todo } from 'src/domain/entities';
import { floorToDate, lessThanADay, getTodayTime } from 'src/utils/time';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
	@Output() changedTodo = new EventEmitter();
	private trueSource: Todo;
	public currentTodo: Todo;
	public dueDate: Date;
	public planDate: Date;
	
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private todoService: TodoService,
		private message: NzMessageService
	  ) { }

	ngOnInit(): void {
		const urlArr = this.router.url.split("/")
		const id = urlArr[urlArr.length - 1];
		const todo = this.todoService.getByUUID(id);
		this.trueSource = todo;
		this.currentTodo = Object.assign({}, todo);
		if (todo.dueAt) {
			this.dueDate = new Date(todo.dueAt);
		}
		if (todo.planAt) { 
			this.planDate = new Date(todo.planAt);
		}
	}
	
	public goBack(): void { 
		this.router.navigateByUrl("main");
	}

	public handlePlanDateChange(date: Date): void { 
		const t = date ? date.getTime() : undefined;
		if (!t) {
		  this.currentTodo.notifyMe = false;
		}
		this.currentTodo.planAt = t;
		this.checkDate();
	}

	public handleDueDateChange(date: Date): void {
		const dueAt = date ? date.getTime() : undefined;
		this.currentTodo.dueAt = dueAt;
		if (dueAt && lessThanADay(dueAt)) {
		  this.message.warning('任务将会在 24 小时内到期', {
			nzDuration: 6000
		  });
		}
		this.checkDate();
	}
	
	public checkDate(): void { 
		const { dueAt, planAt } = this.currentTodo;
    	if (dueAt && planAt && floorToDate(planAt) > dueAt) {
      		this.message.warning('你确定要在到期之后才开始做这个项目吗？', {
        	nzDuration: 6000
      		});
    	}
	}

	public dueDisabledDate(time: Date): boolean { 
		return floorToDate(time) < getTodayTime();
	}
	public planDisabledDate(time: Date): boolean { 
		return floorToMinute(time) < getCurrentTime();
	}

	public clickSwitch(): void { 
		if (this.currentTodo.completedFlag) { 
			return;
		}
		if (!this.currentTodo.planAt) { 
			this.message.warning("还没设置计划日期");
			return;
		}
		this.currentTodo.notifyMe = !this.currentTodo.notifyMe;
	}

	public handleConfirm(): void { 
		this.todoService.update(this.currentTodo);
		this.goBack();
	}

	public delete(): void {
		this.todoService.delete(this.currentTodo._id);
		this.goBack();
	}

}
