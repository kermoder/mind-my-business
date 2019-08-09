import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	contentUrl = 'http://localhost:4200/dummydata.json';
	data: any;

	constructor(private http: HttpClient) { }
	

	getContent() {
		this.data = this.http.get(this.contentUrl);
		return this.data;
	}

	guidPart() : string {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	}

	guid() : string {
		return this.guidPart() + "-" + this.guidPart() + "-" + this.guidPart();
	}

	name(id: string) : string {
		var o = this.taskNode(id, this.data);
		if (o !== null)
			return o.name;
		return "";
	}

	save(tn : TaskNode) : void {
		var existing = this.taskNode(tn.guid, this.data);
		existing.name = tn.name;
		existing.value = tn.value;
	}

	value(id: string) : string {
		var o = this.taskNode(id, this.data);
		if (o !== null)
			return o.value;
		return "";
	}

	taskNode (id: string, arr: any[]) : any {
		if (arr === undefined)
			return null;
		for (var i=0; i<arr.length; i++){
			var o = arr[i];
			if (o.guid === id)
				return o;
			if (o.children !== null){
				o = this.taskNode(id, o.children);
				if (o !== null)
					return o;
			}
		}
		return null;
	}


}
