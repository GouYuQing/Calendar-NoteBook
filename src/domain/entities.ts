import { generateUUID } from "src/utils/uuid";

export class Todo {
	public _id: string;
	public title?: string;
	public createdAt?: number;
	public listUUID: string;
	public desc?: string;
	public completedFlag: boolean;
	public completedAt?: number;
	public dueAt?: number;
	public planAt?: number;
	public notifyMe = false;
  
	constructor(title: string, listUUID: string) {
	  this._id = generateUUID();
	  this.title = title;
	  this.listUUID = listUUID;
	  this.completedFlag = false;
	}
  }
  
  export class List {
	public _id: string;
	public title: string;
	public createdAt?: number;
  
	constructor(title: string) {
	  this._id = generateUUID();
	  this.title = title;
	}
}

export type RankBy = 'title' | 'dueAt' | 'planAt' | 'completeFlag';
