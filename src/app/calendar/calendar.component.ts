import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';
import { Appointment } from '../models/appointment.model';
import { take } from 'rxjs/operators';
import { CalendarStoreService } from '../store/calendar.store';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  daysOfTheWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  weeks: Date[][] = [];
  monthDays: Date[] = [];

  viewDate: Date = new Date();
  selectedDate: Date | null = null;

  appointments$ = this.calendarStoreService.appointments$;

  constructor(
    public dialog: MatDialog,
    private calendarStoreService: CalendarStoreService
  ) {
    this.createView(this.viewDate);
  }

  ngOnInit(): void {
    this.createView(this.viewDate);
  }

  goToPreviousMonth() {
    this.viewDate = new Date(
      this.viewDate.setMonth(this.viewDate.getMonth() - 1)
    );
    this.createView(this.viewDate);
  }

  goToNextMonth() {
    this.viewDate = new Date(
      this.viewDate.setMonth(this.viewDate.getMonth() + 1)
    );
    this.createView(this.viewDate);
  }

  isCurrentDay(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  createView(date: Date) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.weeks = [];
    this.monthDays = [];
    let week: Date[] = [];
    const firstDayIndex = (start.getDay() + 6) % 7;

    for (let day = firstDayIndex; day > 0; day--) {
      const prevDate = new Date(start);
      prevDate.setDate(start.getDate() - day);
      week.push(prevDate);
      this.monthDays.push(prevDate);
    }

    for (let day = 1; day <= end.getDate(); day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      this.monthDays.push(currentDate);
      week.push(currentDate);
      if (week.length === 7) {
        this.weeks.push(week);
        week = [];
      }
    }

    for (let day = 1; week.length < 7; day++) {
      const nextDate = new Date(end);
      nextDate.setDate(end.getDate() + day);
      week.push(nextDate);
    }

    if (week.length > 0) {
      this.weeks.push(week);
    }
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  selectDate(date?: Date) {
    this.selectedDate = date ?? new Date();
    this.openDialog();
  }

  addAppointment(date: Date, title: string) {
    const newAppointment: Appointment = {
      id: (Math.random() * 1000000).toString(),
      date,
      title,
      color: this.calendarStoreService.getRandomColor(),
    };
    this.calendarStoreService.addAppointment(newAppointment);
  }

  deleteAppointment(appointment: Appointment, event: Event) {
    event.stopPropagation();
    if (appointment.id) {
      this.calendarStoreService.deleteAppointment(appointment.id);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '500px',
      panelClass: 'dialog-container',
      data: {
        date: this.selectedDate,
        title: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addAppointment(result.date, result.title);
      }
    });
  }

  drop(event: CdkDragDrop<Appointment[]>, date: Date, slot?: string) {
    const movedAppointment = event.item.data;
    movedAppointment.date = date;
    if (slot) {
      movedAppointment.startTime = slot;
      movedAppointment.endTime = slot;
    }
  }

  isCurrentMonth(date: Date): boolean {
    return (
      date.getMonth() === this.viewDate.getMonth() &&
      date.getFullYear() === this.viewDate.getFullYear()
    );
  }

  editAppointment(appointment: Appointment, event: Event) {
    event.preventDefault();
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '500px',
      panelClass: 'dialog-container',
      data: appointment,
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          if (result.remove) {
            this.calendarStoreService.deleteAppointment(result.id);
          } else {
            this.calendarStoreService.appointments$
              .pipe(take(1))
              .subscribe((currentAppointments) => {
                const updatedAppointments = currentAppointments.map(
                  (existingAppointment) =>
                    existingAppointment.id === result.id
                      ? result
                      : existingAppointment
                );
                this.calendarStoreService.updateAppointments(
                  updatedAppointments
                );
              });
          }
        }
      });
  }
}
