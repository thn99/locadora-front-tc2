import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'birthDatePipe'
})
export class BirthDatePipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.replace(/(\d{2})(\d{2})(\d{4})/, `$1/$2/$3`);
  }

}
