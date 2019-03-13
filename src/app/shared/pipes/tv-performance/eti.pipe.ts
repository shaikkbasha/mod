import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eti'
})
export class EtiPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value - (hours * 3600)) / 60);
    let seconds = value - (hours * 3600) - (minutes * 60);
    seconds = Math.round(Math.round(seconds * 100) / 100);

    const result = `${(hours < 10 ? '0' + hours : hours)}h ${(minutes < 10 ? '0' + minutes : minutes)}`;
    return `${result}m ${(seconds < 10 ? '0' + seconds : seconds)}s`;
  }

}
