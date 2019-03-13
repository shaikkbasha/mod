import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flightPhase'
})
export class FlightPhasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      value = value.toLowerCase();
      const formattedValue = [];
      value.split('-').forEach(val => {
        val = val.trim();
        formattedValue.push(val.charAt(0).toUpperCase() + val.slice(1));
      });
      return formattedValue.join('-');
    }
  }

}
