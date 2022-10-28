import { Component, ElementRef, Input, ViewChild, AfterViewInit  } from '@angular/core';
import { fromEvent } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'hello',
  //templateUrl: './hello.component.html',
  template: `<div>
  <label for="stockid">OnKeyUp </label><br>
  <input type="text" placeholder="Stock symbol..." id="stockid" (keyup)="onKeyUp($event)">
  </div>
  <p>
  <div>
  <label for="stockSymbolid">addEventListener keyup </label><br>
  <input type="text" placeholder="Stock symbol ..." #stockSymbol  id="stockSymbolid"/>
  </div>
  <p>
  <div>
  <label for="stockSymbolElementID">ElementRef Observable </label><br>
  <input type="text" placeholder="Stock symbol ..."  #stockSymbolElement id="stockSymbolElementID">
  </div>
  <p>
  <div>
  <label for="stockFormContrtol">FormControl Observable </label><br>
  <input type="text" placeholder="Stock symbol ..." [formControl]="stockInput" id="stockFormContrtol" />
  </div>`,
  styles: [`h1 { font-family: Lato; }`],
})
export class HelloComponent implements AfterViewInit {
  stockInput = new FormControl('');
  @ViewChild('stockSymbol') myInputField: ElementRef;   // for addEventListener('keyup')
  @ViewChild('stockSymbolElement') myInputField2: ElementRef; // for fromEvent
  private timeout1;

  constructor() {
    this.stockInput.valueChanges
      .pipe(debounceTime(500))
      .subscribe((stock) => this.getStockQuoteForFromControl(stock));
  }

  onKeyUp(event: any) {
    if (this.timeout1) {
      clearTimeout(this.timeout1);
    }
    this.timeout1 = setTimeout(() => {
      console.log('You have entered ' + event.target.value);
    }, 500);
  }

  ngAfterViewInit() {
    let timeout;
    this.myInputField.nativeElement.addEventListener(
      'keyup',
      (event) => {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          this.getStockPriceForAddEventListner(event);
        }, 500);
      },
      false
    );

    fromEvent(this.myInputField2.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        map((event) => event['target'].value)
      )
      .subscribe((stock) => this.getStockQuoteForNativeElement(stock));
  }

  getStockPriceForOnKeyUp(event) {
    console.log(
      `(OnKeyUp) The price of ${event.target.value} is ${( 100 * Math.random()).toFixed(4)}` );
  }

  getStockQuoteForFromControl(stock: string) {
    console.log(
      `(FormControl) The price of ${stock} is ${(100 * Math.random()).toFixed(
        4
      )} `
    );
  }
  getStockQuoteForNativeElement(stock: string) {
    console.log(
      `(NativeElemennt) The price of ${stock} is ${(
        100 * Math.random()
      ).toFixed(4)} `
    );
  }
  getStockPriceForAddEventListner(event) {
    console.log(
      `(addEventListener) The price of ${event.target.value} is ${( 100 * Math.random()).toFixed(4)}`
    );
  }
}
