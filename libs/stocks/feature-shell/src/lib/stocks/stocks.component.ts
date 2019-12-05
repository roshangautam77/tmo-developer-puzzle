import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import {AppCustomDirective} from "./date-validator";


@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  startDate: Date;
  endDate: Date;
  today: Date = new Date();

  quotes$ = this.priceQuery.priceQueries$;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      dateRange: this.fb.group({
        startDate: [this.today, Validators.required],
        endDate: [this.today, Validators.required]
      }, {validator: AppCustomDirective.dateRangeValidator}),
    });
  }

  ngOnInit() {}

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const symbol = this.stockPickerForm.value.symbol;
      this.priceQuery.fetchQuote(symbol, 'max');
    }
  }
}
