import { Component, VERSION } from '@angular/core';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  emitter: Observable<string>;

  constructor() {
    emitter: Observable<string>;
    this.emitter = of('Sam');
    this.emitter.subscribe((value: string) => {
      console.log(`Name from Observable: ${value}`);
    });
  }
}
