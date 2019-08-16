import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { TaskNode } from '../task-node';

@Component({
	selector: 'app-dlg',
	templateUrl: './dlg.component.html',
	styleUrls: ['./dlg.component.css']
})
export class DlgComponent {
	dataService: DataService;
	data: TaskNode;

	constructor(public dialogRef: MatDialogRef<DlgComponent>,
				private ds : DataService, 
				@Inject(MAT_DIALOG_DATA) public content: TaskNode) { 
		this.dataService = ds;
		this.data = content;
	}

	onSave(): void {
		this.dataService.save(this.data);
		this.dialogRef.close();
	}

	onDelete(): void {
		this.dataService.deleteNode(this.data);
		this.dialogRef.close();
	}

	onNewChild(): void {
		this.dataService.addChild(this.data);
		this.dialogRef.close();
	}

	onNewSibling(): void {
		this.dataService.addSibling(this.data);
		this.dialogRef.close();
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

}
