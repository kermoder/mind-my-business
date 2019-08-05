import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	contentUrl = 'http://localhost:4200/dummydata.json';

	constructor(private http: HttpClient) { }

	getContent() {
		return this.http.get(this.contentUrl);
	}

}
