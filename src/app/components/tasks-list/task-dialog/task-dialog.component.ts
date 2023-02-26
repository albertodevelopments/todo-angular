import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TaskComponent } from '../../task/task.component';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  providers: [DialogService]
})
export class TaskDialogComponent implements OnDestroy {

  @Output() showModal: EventEmitter<boolean>

  public ref: DynamicDialogRef

  constructor(
    public dialogService: DialogService
  ){
    this.ref = this.dialogService.open(TaskComponent, {
      width: '40%',
      header: 'Task detail',
      baseZIndex: 10000,
      maximizable: false
    });
    this.showModal = new EventEmitter<boolean>()

    this.ref.onClose.subscribe(() => {
      this.showModal.emit(false)
    }); 
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
}

}
