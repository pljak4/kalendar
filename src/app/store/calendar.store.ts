import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarStoreService {
  public appointmentsSubject = new BehaviorSubject<Appointment[]>(
    this.defaultAppointments()
  );
  appointments$ = this.appointmentsSubject.asObservable();

  public defaultAppointments(): Appointment[] {
    const today = new Date();
    return [
      {
        id: '0',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        title: 'Code Review Meeting',
        color: this.getRandomColor(),
      },
      {
        id: '1',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        title: 'Sprint Planning',
        color: this.getRandomColor(),
      },
      {
        id: '2',
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        title: 'Frontend Standup',
        color: this.getRandomColor(),
      },
      {
        id: '3',
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1
        ),
        title: 'Bug Triage',
        color: this.getRandomColor(),
      },
      {
        id: '4',
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 2
        ),
        title: 'Client Demo',
        color: this.getRandomColor(),
      },
      {
        id: '5',
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 3
        ),
        title: 'Backend Integration Testing',
        color: this.getRandomColor(),
      },
      {
        id: '6',
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 4
        ),
        title: 'Deployment to Production',
        color: this.getRandomColor(),
      },
      {
        id: '7',
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 5
        ),
        title: 'API Documentation Update',
        color: this.getRandomColor(),
      },
      {
        id: '8',
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 1
        ),
        title: 'Database Migration',
        color: this.getRandomColor(),
      },
      {
        id: '9',
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 2
        ),
        title: 'UI/UX Design Review',
        color: this.getRandomColor(),
      },
      {
        id: '10',
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 6
        ),
        title: 'Code Refactoring Session',
        color: this.getRandomColor(),
      },
      {
        id: '11',
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 7
        ),
        title: 'Weekly Standup',
        color: this.getRandomColor(),
      },
      {
        id: '12',
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 8
        ),
        title: 'Project Kickoff',
        color: this.getRandomColor(),
      },
      {
        id: '13',
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 9
        ),
        title: 'Tech Talk: New Angular Features',
        color: this.getRandomColor(),
      },
      {
        id: '14',
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 10
        ),
        title: 'QA Testing Session',
        color: this.getRandomColor(),
      },
      {
        id: '15',
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 11
        ),
        title: 'Strategy Meeting with CTO',
        color: this.getRandomColor(),
      },
      {
        id: '16',
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 12
        ),
        title: 'Onboarding New Developer',
        color: this.getRandomColor(),
      },
      {
        id: '17',
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 13
        ),
        title: 'Performance Optimization Workshop',
        color: this.getRandomColor(),
      },
      {
        id: '18',
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 14
        ),
        title: 'Project Retrospective',
        color: this.getRandomColor(),
      },
      {
        id: '19',
        date: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 15
        ),
        title: 'Board Update on Development Progress',
        color: this.getRandomColor(),
      },
    ];
  }

  updateAppointments(appointments: Appointment[]) {
    this.appointmentsSubject.next(appointments);
  }

  addAppointment(appointment: Appointment) {
    const currentAppointments = this.appointmentsSubject.value;
    this.appointmentsSubject.next([...currentAppointments, appointment]);
  }

  deleteAppointment(id: string) {
    const updatedAppointments = this.appointmentsSubject.value.filter(
      (appointment) => appointment.id !== id
    );
    this.appointmentsSubject.next(updatedAppointments);
  }

  public getRandomColor(): string {
    const colors = [
      'rgba(85, 239, 196, 0.7)',
      'rgba(129, 236, 236, 0.7)',
      'rgba(116, 185, 255, 0.7)',
      'rgba(162, 155, 254, 0.7)',
      'rgba(253, 203, 110, 0.7)',
      'rgba(255, 118, 117, 0.7)',
      'rgba(223, 249, 251, 0.7)',
      'rgba(225, 112, 85, 0.7)',
      'rgba(250, 177, 160, 0.7)',
      'rgba(174, 234, 255, 0.7)',
      'rgba(200, 214, 229, 0.7)',
      'rgba(255, 234, 167, 0.7)',
      'rgba(232, 67, 147, 0.7)',
      'rgba(253, 121, 168, 0.7)',
      'rgba(126, 214, 223, 0.7)',
      'rgba(240, 147, 43, 0.7)',
      'rgba(109, 33, 79, 0.7)',
      'rgba(72, 52, 212, 0.7)',
      'rgba(83, 92, 104, 0.7)',
      'rgba(58, 134, 255, 0.7)',
      'rgba(255, 107, 129, 0.7)',
      'rgba(255, 159, 243, 0.7)',
      'rgba(189, 197, 129, 0.7)',
      'rgba(84, 160, 255, 0.7)',
      'rgba(196, 69, 105, 0.7)',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
