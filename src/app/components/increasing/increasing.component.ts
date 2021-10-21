import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-increasing',
  templateUrl: './increasing.component.html',
  styles: [
  ]
})
export class IncreasingComponent implements OnInit{
  
  invalid: boolean = false;

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input('value') progress: number = 40;
  @Input() btnClass: string = 'btn-primary';

  @Output() OutputValue: EventEmitter<number> = new EventEmitter(); 

  changeValue(value: number) {
    this.invalid = false;
    if (this.progress >= 100 && value >= 0){
      this.OutputValue.emit(100)
      this.progress = 100;
    }
    else if (this.progress <= 0 && value < 0){
      this.OutputValue.emit(0)
      this.progress = 0;
    } else {
      this.progress += value;
      this.OutputValue.emit(this.progress)
    }
  }

  onChange(newValue: number) {
    if (newValue >= 100) {
      this.invalid = true;
      this.progress = 100;
    } else if (newValue <= 0) {
      this.invalid = true;
      this.progress = 0
    } else {
      this.invalid = false;
      this.progress = newValue
    }

    this.OutputValue.emit(this.progress)
  }

}
