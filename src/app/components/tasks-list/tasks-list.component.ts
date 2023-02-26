import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {

  public dialogShown: boolean

  constructor(){
    this.dialogShown = false
  }

  toggleModalDialog(shown: boolean): void {
    this.dialogShown = shown
  }
}
