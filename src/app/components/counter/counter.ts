import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  count = signal(0);
  doubled = computed(() => this.count() * 2);

  substract() {
    this.count.update((old) => old - 1);
  }
  increment() {
    this.count.update((old) => old + 1);
  }
  reset() {
    this.count.set(0);
  }
}
