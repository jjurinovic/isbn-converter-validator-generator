import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsbnService {
  private regexISBN10or13 = new RegExp( //https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s13.html
  /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/
);

// standard formats for ISBN-10 and ISBN-13
public isbn10Format = [1, 3, 5, 1];
public isbn13Format = [3, 2, 4, 3, 1];

/**
 * Remove hypens from ISBN value
 * @param {string} isbn ISBN-value
 * @returns Returns ISBN value without hypens
 */
public removeHypens(isbn: string): string {
  return isbn.replace(/-/g, '');
}

/**
 * Caclulate remainder from sum of numbers in ISBN-10 or ISBN-10
 * @param {string} isbn ISBN-10 or ISBN-13 value
 * @returns {number} Returns remainder of given ISBN-13 or ISBN-10
 */
private calculateRemainder(isbn: string): number {
  // remove hypens from isbn value
  const withoutHypens = this.removeHypens(isbn);

  // get ISBN type depending on number of characters without hypens
  const isbnLength = withoutHypens.length;

  // reverse isbn value because of easier calculating with indexes
  const reversedIsbn = withoutHypens.split('').reverse();

  // if calculate remainder for conversion ISBN-10 to 13
  // then last number shoulf be multiplied with 1
  // because there is 12 numbers and we reversed them
  // for 13 numbers last number should be mutltiplied with 3
  const isbn13Multipliers = isbnLength === 13 ? [3, 1] : [1, 3];

  // calculate sum
  let sum = reversedIsbn.reduce((acc: number, curr: string, i: number) => {
    let val: any = curr === 'X' ? '10' : curr; // if last char is letter 'X' that is replaced with number 10
    val = parseInt(val);

    // counter needs to start from 1
    const counter = i + 1;

    // for ISBN-10 with use multiply numbers with 1,2,3,...
    // but for ISBN-13 we multiply with 1 and 3
    const multiplyWith =
      isbnLength > 10
        ? counter % 2 === 0
          ? isbn13Multipliers[0]
          : isbn13Multipliers[1]
        : counter;

    return acc + val * multiplyWith;
  }, 0);

  // divide with 11 if ISBN-10 and with 10 if ISBN-13
  const divideWith = isbnLength === 10 ? 11 : 10;

  // return remainder
  return sum % divideWith;
}

/**
 * Check if ISBN-10 or ISBN-13 value is valid
 * @param {string} isbn Value of ISBN to be checked
 * @returns {boolean} Returns true if value is valid ISBN-10 or ISBN-13
 */
public validate(isbn: string): boolean {
  // check regular expression if value is valid ISBN-10 or ISBN-13 format
  if (!this.regexISBN10or13.test(isbn)) return false;

  const remainder = this.calculateRemainder(isbn);

  return remainder === 0;
}

/**
 * Convert ISBN-10 to ISBN-13
 * @param {string} isbn10 ISBN-10 value
 * @returns {string} Return ISBN-13 value
 */
public convertTo13(isbn10: string): string {
  //remove last digit
  const withoutLastDigit = isbn10.slice(0, -1);

  // add "978" to the front
  const withPrefix = `978-${withoutLastDigit}`;

  const remainder = this.calculateRemainder(withPrefix);

  //if remainder is 0, then we use 10
  let lastDigit = 10 - (remainder === 0 ? 10 : remainder);

  const formattedIsbn = this.format(this.removeHypens(`${withPrefix}${lastDigit}`));

  return `${withPrefix}${lastDigit}`;
}

/**
 * Generate radnom ISBN-10 or ISBN-13
 * @param {number} isbnType ISBN type: 10 or 13
 * @returns Returns random generated ISBN by given isbn type
 */
public generate(isbnType: number): string {
  let isValid = false;
  let isbn: string = '';

  while (!isValid) {
    let values = Array(isbnType).fill(0);

    values.forEach((val, i) => {
      values[i] = Math.floor(Math.random() * 10);
    });

    isbn = values.toString().replace(/,/g, '');

    isValid = this.validate(isbn);
  }

  // format
  const formattedIsbn = this.format(isbn);

  return formattedIsbn;
}

/**
 * Format ISBN
 * @param {string} isbn ISBN value
 * @returns Returns formatted version of ISBN
 */
private format(isbn: string): string {

  // depending on isbn length choose format to use
  const format = isbn.length === 10 ? this.isbn10Format : this.isbn13Format;
  let isbnArr = isbn.split('');
  let indexSum = 0;

  for (let i = 0; i < format.length - 1; i++) {
    indexSum += format[i];
    const index = indexSum + i;

    // add hypens to ISBN depending on format
    isbnArr.splice(index, 0, '-');
  }

  return isbnArr.join('');
}
}
