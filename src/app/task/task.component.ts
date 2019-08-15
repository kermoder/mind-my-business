import { Component, OnInit, Inject } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { DataService } from '../data.service';
import { DlgComponent } from '../dlg/dlg.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

/*
  todo: 
  0. OK add to GitHub
  1. OK load data via an ajax call.
  2. encrypt/decrypt data dynamically
  3. add functionality to create / edit / delete nodes
  4. create apache mod.
  5. get drag and drop working
  6. get save working
  7. deploy the whole mess.
*/

export class TaskNode {
	guid: string;
	name: string;
	children?: TaskNode[];
	value?: string;

	copyTn(tn: TaskNode) : TaskNode {
		var tnNew = new TaskNode();
		tnNew.name = tn.name;
		tnNew.value = tn.value;
		tnNew.children = [];
		return tnNew;
	}

}

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
	treeControl = new NestedTreeControl<TaskNode>(node => node.children);
	dataSource = new MatTreeNestedDataSource<TaskNode>();
	dataService: DataService;

	constructor(private ds : DataService, 
				public dialog: MatDialog) { 
		this.dataService = ds;
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
			console.log('The dialog was closed, right?', this.dataSource.data);
		});
	}

	drop(event: CdkDragDrop<string[]>) {
		//moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
	}

	hasChild = (_: number, node: TaskNode) => !!node.children && node.children.length > 0;

}

