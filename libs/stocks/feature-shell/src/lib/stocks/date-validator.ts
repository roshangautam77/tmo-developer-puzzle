import { AbstractControl } from '@angular/forms';

export class AppCustomDirective {

  static dateRangeValidator(dateRange: AbstractControl): {[key: string]: any} | null {
    const startDate = dateRange.value.startDate;
    const endDate = dateRange.value.endDate;

    if (startDate > endDate) {
      return {'invalidStartDate': true};
    } else {
      return null;
    }
  }
}
