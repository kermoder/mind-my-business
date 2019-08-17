import { Component, OnInit, Inject } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { DataService } from '../data.service';
import { DlgComponent } from '../dlg/dlg.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskNode } from '../task-node';


/*
  todo: 
  0. OK add to GitHub
  1. OK load data via an ajax call.
  2. encrypt/decrypt data dynamically
  3. OK add functionality to create / edit / delete nodes
  4. create apache mod.
  5. get drag and drop working
  6. get save working
  7. deploy the whole mess.
*/

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
	treeControl = new NestedTreeControl<TaskNode>(node => node.children);
	dataSource = new MatTreeNestedDataSource<TaskNode>();
	dataService: DataService;
	guid0: string
	guid1: string

	constructor(private ds : DataService, 
				public dialog: MatDialog) { 
		this.dataService = ds;
		this.guid0 = null;
		this.guid1 = null;
		// generate a few guids
		// for (var i=0; i<10; i++){
		// 	console.log(this.dataService.guid())
		// }
	}

	ngOnInit() {
		this.dataService.getContent().subscribe((data: TaskNode[]) => {
			this.dataSource.data = data;
			this.ds.setData(data);
		});
	}

	edit(id: string) {
		var n = this.dataService.name(id);
		var v = this.dataService.value(id);
		const dialogRef = this.dialog.open(DlgComponent, {
			width: '40vw', height: '50vh',
			data: {guid: id, name: n, value: v}
		});
		dialogRef.afterClosed().subscribe(result => {
			this.dataSource.data = [];                     // need this to coax rerendering
			this.dataSource.data = this.dataService.data;  // of the html.
		});
	}

	toggle(guid:string) {
		console.log("guid", guid);
		if (this.guid0 == null) {
			this.guid0 = guid;
			console.log("returning");
			return;
		} else if (guid != this.guid1)
			this.guid1 = guid;
		console.log("A");
		var tn0 = this.dataService.taskNode(this.guid0, this.dataService.data, true);
		if (tn0 === null) {
			console.log("B");
			return;
		}
		var tn1 = this.dataService.taskNode(this.guid1, this.dataService.data, false);
		console.log("C", tn1);
		if (tn1 === null) {
			console.log("C1");
			return;
		}
		tn1.children.push(tn0);
		this.dataSource.data = [];                     // need this to coax rerendering
		this.dataSource.data = this.dataService.data;  // of the html.
		console.log("D");
		this.guid0 = null;
		this.guid1 = null;
	}

	hasChild = (_: number, node: TaskNode) => !!node.children && node.children.length > 0;

}

