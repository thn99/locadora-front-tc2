import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phonePipe',
})
export class PhonePipePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (value.length < 8 || value.length > 13 || !!value.match(/\D+/g))
      return 'Inválido';
    else {
      if (value.length === 8) {
        return value.replace(/(\d{4})(\d{4})/, '$1-$2');
      } else if (value.length === 9) {
        return value.replace(/(\d{1})(\d{4})(\d{4})/, '$1 $2-$3');
      } else if (value.length === 10) {
        return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      } else if (value.length === 11) {
        return value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
      } else if (value.length === 12) {
        return value.replace(/(\d{2})(\d{2})(\d{4})(\d{4})/, '+$1 ($2) $3-$4');
      } else if (value.length === 13) {
        return value.replace(
          /(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})/,
          '+$1 ($2) $3 $4-$5'
        );
      } else {
        return 'Inválido';
      }
    }
  }
}
