import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TaskNode } from './task/task.component';


@Injectable({
	providedIn: 'root'
})
export class DataService {
	contentUrl = 'http://localhost:4200/dummydata.json';
	data: any[];
	contentObs : Observable <any>;

	constructor(private http: HttpClient) { }

	getContent() : Observable <any>{
		return this.http.get(this.contentUrl);
	}

	setData(arr : any[]) {
		this.data = arr;
	}

	guidPart() : string {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	}

	guid() : string {
		return this.guidPart() + "-" + this.guidPart() + "-" + this.guidPart();
	}

	name(id: string) : string {		
		var o = this.taskNode(id, this.data, false);
		if (o !== null)
			return o.name;
		return "";
	}

	value(id: string) : string {
		var o = this.taskNode(id, this.data, false);
		if (o !== null)
			return o.value;
		return "";
	}

	save(tn : TaskNode) : void {
		var existing = this.taskNode(tn.guid, this.data, false);
		existing.name = tn.name;
		existing.value = tn.value;
	}

	deleteNode(tn : TaskNode) : void {
		this.taskNode(tn.guid, this.data, true);
	}

	taskNode (id: string, arr: any[], deleteIt: boolean) : any {
		if (arr === undefined)
			return null;
		for (var i=0; i<arr.length; i++){
			var o = arr[i];
			if (o.guid === id) {
				if (deleteIt){
					console.log("deleting ", o.name);
					arr.splice(i, 1);
					return null;
				}
				return o;
			}
			if (o.children !== null){
				o = this.taskNode(id, o.children, deleteIt); //recur
				if (o !== null)
					return o;
			}
		}
		return null;
	}

}
