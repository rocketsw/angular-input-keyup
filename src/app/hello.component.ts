  import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
  import { FormControl} from '@angular/forms';
  import { debounceTime } from 'rxjs/operators';
  
@Component({
  selector: 'hello',
  //templateUrl: './hello.component.html',
  template: `<div>
  <label for="stock">OnKeyUp </label><br>
  <input placeholder="Stock symbol..." id="stock" (keyup)="onKeyUp($event)">
  </div>
  <p>
  <div>
  <label for="stockSymbolid">addEventListener keyup </label><br>
  <input placeholder="Stock symbol ..." type="text" #stockSymbol  id="stockSymbolid"/>
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
  @Input() helloname: string;
  @ViewChild('stockSymbol') myInputField: ElementRef;
  private timeout1;

  constructor() {
      this.stockInput.valueChanges
      .pipe(debounceTime(500))
      .subscribe(stock => this.getStockQuoteFromServer(stock));
  }
  
  onKeyUp(event:any) {
    if(this.timeout1) {
      clearTimeout(this.timeout1);
    }
    this.timeout1 = setTimeout(() => {
      console.log("You have entered " + event.target.value);
    }, 500);
    
  }

  ngAfterViewInit() {
    let timeout;
    this.myInputField.nativeElement.addEventListener("keyup", event => {
      if(timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
         this.getStockPrice(event);
      }, 500);
    }, false);
  }
  
  getStockQuoteFromServer(stock: string) {
    console.log(`The price of ${stock} is ${(100 * Math.random()).toFixed(4)} `);
}
  getStockPrice(event){ 
    console.log("Entered Stock symbol: " + event.target.value);
  }

}
