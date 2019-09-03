import { Directive,HostListener,Output,EventEmitter, Host } from '@angular/core';

@Directive({
  selector: '[appDropzone]'
})
export class DropzoneDirective {

  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();
  constructor() { }

  @HostListener('drop',['$event'])
  onDrop($event){
      $event.preventDefault();
      this.dropped.emit($event.dataTransfer.files);
      this.hovered.emit(false);
  }
  @HostListener('dragover',['$event'])
  OnDragOver($event){
      $event.preventDefault();
      this.hovered.emit(true);
  }
  @HostListener('dragleave',['$event'])
  OnDragLeave($event){
      $event.preventDefault();
      this.hovered.emit(false);
  }
}
