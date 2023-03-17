import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  /**
   * string을 ...으로 치환하는 파이프
   * @param value 치환할 string 데이터
   * @param limit 치환하지 않을 string 글자 수
   * @returns 
   */
  transform(value: string, limit: number): string {
    if ( value.length > limit ) {
      value = value.substring(0, limit) + '...';
    }

    return value;
  }

}
