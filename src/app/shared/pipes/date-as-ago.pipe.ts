import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAsAgo'
})
export class DateAsAgoPipe implements PipeTransform {

  transform(value: Date): string {
    let fecha = new Date(value);
    // value.setDate(new Date(Date.now()));
    if(fecha < new Date()){
      return this.timeAgo(fecha);
    } else {
      return this.timeLeft(fecha);
    }
  }

  timeAgo(value: Date): string {
    console.log("timeAgo");
    if (!value) { return 'momento indefinido'; }
    console.log(value);
    let time = (new Date().valueOf() - value.valueOf()/*Date.parse(value.getDate().toString())*/) / 1000;
    console.log(time);
    if (time < 10) {
      return 'ahora mismo';
    } else if (time < 60) {
      return 'hace un momento';
    }
    const divider = [60, 60, 24, 30, 12];
    const string = [' segundo', ' minuto', ' hora', ' día', ' mes', ' año'];
    let i;
    let dividerFinal;
    for (i = 0; Math.floor(time / divider[i]) > 0; i++) {
      time /= divider[i];
      dividerFinal = divider[i];
    }
    let plural: string = '';
    if(Math.floor(time) > 1){
      plural = dividerFinal === divider[3]? plural = 'es': plural = 's';
    }
    return 'hace ' + Math.floor(time) + string[i] + plural;
  }

  timeLeft(value: Date): string {
    console.log("timeLeft");
    if (!value) { return 'momento indefinido'; }
    console.log(value);
    let time = (-new Date().valueOf() - (-value.valueOf()))/*Date.parse(value.getDate().toString()))*/  / 1000;
    console.log(time);
    if (time < 10) {
      return 'ahora mismo';
    } else if (time < 60) {
      return 'dentro de un momento';
    }
    const divider = [60, 60, 24, 30, 12];
    const string = [' segundo', ' minuto', ' hora', ' día', ' mes', ' año'];
    let i;
    let dividerFinal;
    for (i = 0; Math.floor(time / divider[i]) > 0; i++) {
      time /= divider[i];
      dividerFinal = divider[i];
    }

    let plural: string = '';
    if(Math.floor(time) > 1) {
      plural = dividerFinal === divider[3]? plural = 'es': plural = 's';
    }
    return 'dentro de ' + Math.floor(time) + string[i] + plural;
  }


  // let date1 = new Date(value);
  // let date2 = new Date('12/15/2010');
  // console.log(getDifferenceInDays(date1, date2));
  // console.log(getDifferenceInHours(date1, date2));
  // console.log(getDifferenceInMinutes(date1, date2));
  // console.log(getDifferenceInSeconds(date1, date2));
  //
  // function getDifferenceInDays(date1, date2) {
  //   const diffInMs = Math.abs(date2 - date1);
  //   return diffInMs / (1000 * 60 * 60 * 24);
  // }
  //
  // function getDifferenceInHours(date1, date2) {
  //   const diffInMs = Math.abs(date2 - date1);
  //   return diffInMs / (1000 * 60 * 60);
  // }
  //
  // function getDifferenceInMinutes(date1, date2) {
  //   const diffInMs = Math.abs(date2 - date1);
  //   return diffInMs / (1000 * 60);
  // }
  //
  // function getDifferenceInSeconds(date1, date2) {
  //   const diffInMs = Math.abs(date2 - date1);
  //   return diffInMs / 1000;
  // }
}
