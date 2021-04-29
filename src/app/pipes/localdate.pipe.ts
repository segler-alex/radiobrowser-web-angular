import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localdate'
})
export class LocaldatePipe implements PipeTransform {

  transform(value: unknown): unknown {
    if (value === null || value === undefined) {
      return "-";
    } else if (typeof value === "string") {
      return new Date(value).toLocaleString();
    } else if (typeof value === "object") {
      if (typeof value.toLocaleString === 'function') {
        return value.toLocaleString();
      }
    }
    return "";
  }
}
