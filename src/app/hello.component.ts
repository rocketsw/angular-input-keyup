  import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
  import { FormControl} from '@angular/forms';
  import { debounceTime } from 'rxjs/operators';
  
@Component({
  selector: 'hello',
  //templateUrl: './hello.component.html',
  template: `<div>
  <label for="stock">KeyUp </label><br>
  <input placeholder="Stock symbol..." id="stock" (keyup)="onKey($event)">
  </div>
  <p>
  <div>
  <label for="stockSymbolid">addEventListener </label><br>
  <input placeholder="Stock symbol ..." type="text" #stockSymbol  id="stockSymbolid"/>
  </div>
  <p>
  <div>
  <label for="stockFormContrtol">FormControl </label><br>
  <input type="text" placeholder="Enter stock" [formControl]="stockInput" id="stockFormContrtol" />
  </div>`,
  styles: [`h1 { font-family: Lato; }`],
})
export class HelloComponent implements AfterViewInit {
  stockInput = new FormControl('');
  @Input() helloname: string;
  @ViewChild('stockSymbol') myInputField: ElementRef;
  
  constructor() {
      this.stockInput.valueChanges
      .pipe(debounceTime(500))
      .subscribe(stock => this.getStockQuoteFromServer(stock));
  }
  
  onKey(event:any) {
    console.log("You have entered " + event.target.value);
  }

  ngAfterViewInit() {
    this.myInputField.nativeElement.addEventListener("keyup", event => {
      setTimeout(() => {
         this.getStockPrice(event);
      }, 1000);
    }, false);
  }
  
  getStockQuoteFromServer(stock: string) {
    console.log(`The price of ${stock} is ${(100 * Math.random()).toFixed(4)} `);
}
  getStockPrice(event){ 
    console.log("Entered Stock symbol: " + event.target.value);
  }

}
