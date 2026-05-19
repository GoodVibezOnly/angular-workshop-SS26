import { Component, signal } from '@angular/core';
import { Greeting } from './components/greeting/greeting';
import { FormsModule } from '@angular/forms';
import { Counter } from './components/counter/counter';
import { TodoList } from './components/todo-list/todo-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Greeting, FormsModule, Counter, TodoList],
})
export class App {
  studentName = signal('Student');
  nameInput = 'Student';
}
