import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const data = new Date(value).getTime().toString().length !== 10 ? value : value * 1000;
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(data, 'dd-MM-yyyy');
  }
}
