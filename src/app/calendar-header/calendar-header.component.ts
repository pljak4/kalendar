import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-calendar-header',
  standalone: true,
  imports: [DatePipe, MatIcon, CommonModule, MatButtonModule],
  templateUrl: './calendar-header.component.html',
  styleUrl: './calendar-header.component.scss',
})
export class CalendarHeaderComponent {
  @Input() viewDate!: Date;
  @Output() goToPreviousMonth = new EventEmitter<void>();
  @Output() goToNextMonth = new EventEmitter<void>();
  @Output() selectDate = new EventEmitter<void>();

  onPrevious() {
    this.goToPreviousMonth.emit();
  }

  onNext() {
    this.goToNextMonth.emit();
  }

  onSelectDate() {
    this.selectDate.emit();
  }
}
