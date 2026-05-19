# Angular Workshop

A hands-on Angular workshop for building on top of an existing project. The starter code is intentionally small so you can read every file quickly and understand what each piece does before extending it.

## What you will learn

| Concept | Where to look |
| --- | --- |
| **Components** — reusable UI building blocks | `src/app/components/greeting/greeting.ts` + `greeting.html` |
| **`input()`** — passing data into a component | `src/app/components/greeting/greeting.ts` |
| **Signals** — Angular's reactive state primitive | `src/app/components/counter/counter.ts` |
| **`computed()`** — derived reactive values | `src/app/components/counter/counter.ts` |
| **`@for` / `@if`** — template control flow | `src/app/components/todo-list/todo-list.html` |
| **Two-way binding** — syncing a form field to a signal | `src/app/components/todo-list/todo-list.html` |

## Get started

```bash
npm install      # install dependencies (only needed once)
npm start        # start dev server → http://localhost:4200
```

The browser reloads automatically whenever you save a file.

## Project layout

```sh
src/app/
├── app.ts / app.html / app.css        ← root component, assembles everything
└── components/
    ├── greeting/
    │   ├── greeting.ts / .html / .css  ← Concept 1: input() + interpolation
    ├── counter/
    │   ├── counter.ts  / .html / .css  ← Concept 2: signal() + computed()
    └── todo-list/
        ├── todo-list.ts               ← Concept 3: signal array + methods
        ├── todo-list.html             ← @for, @if, form binding
        └── todo-list.css
```

## Core concepts explained

### Components

A component = a TypeScript class + an HTML template + optional CSS, all bundled with `@Component`.

```typescript
@Component({
  selector: 'app-greeting',   // the HTML tag used in other templates
  imports: [],                 // standalone: list everything the template uses
  templateUrl: './greeting.html',
  styleUrl:    './greeting.css',
})
export class Greeting {
  input() name = 'Student';  // data passed in from the parent
}
```

Use it in another template:

```html
<app-greeting [name]="studentName()" />
```

The square brackets (`[name]`) mean "evaluate the right-hand side and pass it as the input property."

### Signals

A signal holds a value and notifies Angular when it changes — no manual change detection needed.

```typescript
count = signal(0);                          // writable signal
doubled = computed(() => this.count() * 2); // derived, read-only

increment() { this.count.update(n => n + 1); }
reset()     { this.count.set(0); }
```

Read a signal in a template by calling it like a function:

```html
<p>{{ count() }}</p>
<p>Doubled: {{ doubled() }}</p>
```

### Template control flow

`@for` loops over an array signal. The `track` expression tells Angular which property uniquely identifies each item so it can update only the rows that changed.

```html
@for (todo of todos(); track todo.id) {
  <li>{{ todo.text }}</li>
} @empty {
  <li>Nothing here yet!</li>
}
```

`@if` conditionally renders a block without adding an extra wrapper element:

```html
@if (count() < 0) {
  <p class="warning">The count is negative!</p>
}
```

## Tasks

### Warmup

- [ ] **1. Change the greeting message**
  Open `src/app/greeting.html` and add a second line that shows a different message when `name` equals `'Student'` (the default). Use `@if`.

- [ ] **2. Add a "step size" input to the counter**
  Add a `step = signal(1)` to `counter.ts`. Modify `increment()` and `decrement()` to use `this.step()` instead of hardcoded `1`. Add a number input in `counter.html` so the user can change the step.

### Intermediate

- [ ] **3. Show a "well done" banner when all todos are complete**
  In `todo-list.html`, use `@if` and the existing `remainingCount` computed signal to show a congratulations message when the list is empty.

- [ ] **4. Create a new `<app-badge>` component**
  Run `ng generate component badge`. Give it two `@Input()` properties: `label: string` and `color: string` (default `'#6c63ff'`). Use it inside `todo-list.html` to display the count of completed tasks.

### Advanced

- [ ] **5. Persist todos in `localStorage`**
  In `todo-list.ts`, use Angular's `effect()` function (imported from `@angular/core`) to write the todos signal to `localStorage` whenever it changes. On component init, read back from `localStorage` to pre-populate the list.

- [ ] **6. Build a unit-converter component**
  Create `src/app/components/converter/converter.ts`. Add a `celsius = signal(0)` and a `fahrenheit = computed(...)`. Render two number inputs bound to each value so editing one updates the other.

## Useful commands

```bash
ng generate component <name>   # scaffold a new component
ng generate service  <name>    # scaffold a new service
npm test                       # run tests with Vitest
npm run build                  # production build → dist/
```

## Further reading

- [Angular official docs](https://angular.dev)
- [Signals guide](https://angular.dev/guide/signals)
- [Template syntax](https://angular.dev/guide/templates)
- [Component inputs](https://angular.dev/guide/components/inputs)
