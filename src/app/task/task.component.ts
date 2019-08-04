import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { DataService } from './../data.service';

/*
  todo: 
  0. add to GitHub
  1. OK load data via an ajax call.
  2. encrypt/decrypt data dynamically
  3. create apache mod.
  4. get drag and drop working
  5. get save working
  6. deploy the whole mess.
*/


interface TaskNode {
  name: string;
  children?: TaskNode[];
  value?: string;
}

const TMP_DATA: TaskNode[] = [
	{
		name: 'Information',
		children: [
			{name: 'Addresses'},
			{name: 'Creds',
 			 children: [
				 {name: 'site A',
				  value: 'sadasd'},
				 {name: 'site B',
				  value: 'zxczxvxv'},
				 {name: 'site C',
				  value: 'adfyhdfg'}
			 ]},
			{name: 'Things to remember'},
		]
	}, 
	{
		name: 'To do',
		children: [
			{
				name: 'Practical',
				children: [
					{name: 'Home'},
					{name: 'Career'},
				]
			}, {
				name: 'Creative',
				children: [
					{name: 'Ptruth'},
					{name: 'Cog'},
				]
			},
		]
	},
];

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
	treeControl = new NestedTreeControl<TaskNode>(node => node.children);
	dataSource = new MatTreeNestedDataSource<TaskNode>();
	dataService: DataService;

	constructor(private ds : DataService) { 
		this.dataService = ds;
	}

	ngOnInit() {
		this.ds.getContent().subscribe((data: TaskNode[]) => {
			this.dataSource.data = data;
		});
	}

	hasChild = (_: number, node: TaskNode) => !!node.children && node.children.length > 0;

}
