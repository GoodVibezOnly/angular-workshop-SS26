import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Todo = {
  id: number;
  text: string;
  done: boolean;
}

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {

  inputText = ""

  list = signal<Todo[]>([{
    id: 1,
    text: "Write better cheatsheet",
    done: false
  },
{
    id: 2,
    text: "Write more difficult tasks",
    done: true
  },
{
    id: 3,
    text: "Be more enganging",
    done: false
  }])

  completeTasks = computed(() => this.list().filter(todo => todo.done === true).length)
  uncompleteTasks = computed(() => this.list().filter(todo => todo.done === false).length)

  toggleTaskState (id: number) {
    this.list.update((todos) => todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  deleteTask (id:number) {
    this.list.update((todos) => todos.filter((t) => t.id !== id))
  }

  addTask (content: string) {
    this.list.update((todos) => [...todos, {
      id: todos.length + 1,
      text: content,
      done: false
    }])
  }
}
