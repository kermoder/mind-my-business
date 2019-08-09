import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule } from '@angular/material/tree';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { DlgComponent } from './dlg/dlg.component';

@NgModule({
	declarations: [
		AppComponent,
		TaskComponent,
		DlgComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MatTreeModule,
		MatIconModule,
		MatButtonModule,
		MatDialogModule,
		MatFormFieldModule,
		MatToolbarModule,
		FormsModule,
		DragDropModule,
		HttpClientModule
	],
	entryComponents: [
		DlgComponent,
	],
	exports : [
		DlgComponent
	],
	providers: [
		{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
