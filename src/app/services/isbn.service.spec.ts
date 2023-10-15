import { TestBed } from '@angular/core/testing';
import { IsbnService } from './isbn.service';

describe('IsbnService', () => {
  let service: IsbnService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsbnService],
    });

    service = TestBed.inject(IsbnService);
  });

  describe('validate()', () => {
    it('valid isbn number', () => {
      expect(service.validate('3-598-21508-8')).toBeTruthy();
    });

    it('invalid isbn', () => {
      expect(service.validate('3-598-21508-9')).toBeFalsy();
    });

    it('valid isbn number with X', () => {
      expect(service.validate('0-9752298-0-X')).toBeTruthy();
    });

    it('last character is not X', () => {
      expect(service.validate('0-9752298-0-C')).toBeFalsy();
    });

    it('invalid character', () => {
      expect(service.validate('0-9752D98-0-X')).toBeFalsy();
    });

    it('too long', () => {
      expect(service.validate('960-425-059-03')).toBeFalsy();
    });

    it('no isbn', () => {
      expect(service.validate('')).toBeFalsy();
    });
  });

  describe('removeHypens()', () => {
    it('remove hypens from isbn', () => {
      expect(service.removeHypens('3-598-21507-X')).toEqual('359821507X');
    });
  });

  describe('calculateRemainder()', () => {
    it('valid isbn-10', () => {
      expect(service['calculateRemainder']('3-598-21507-X')).toEqual(0);
    });
    it('invalid isbn-10', () => {
      expect(service['calculateRemainder']('3-598-21508-9')).not.toEqual(0);
    });
    it('valid isbn-13', () => {
      expect(service['calculateRemainder']('978-3-16-148410-0')).toEqual(0);
    });
    it('invalid valid isbn-13', () => {
      expect(service['calculateRemainder']('978-3-17-148410-0')).not.toEqual(0);
    });
  });

  describe('convertTo13()', () => {
    it('valid isbn-10 number to valid isbn-13', () => {
      expect(service.convertTo13('3-598-21507-X')).toEqual(
        '978-3-598-21507-0'
      );
    });
  });

  describe('generate()', () => {
    it('random generated isbn-10 valid', () => {
      const generatedIsbn = service.generate(10);
      expect(service.validate(generatedIsbn)).toBeTruthy();
    });

    it('random generated isbn-13 valid', () => {
      const generatedIsbn = service.generate(13);
      expect(service.validate(generatedIsbn)).toBeTruthy();
    });
  });

  describe('format()', () => {
    it('valid isbn-10', () => {
      expect(service['format']('359821507X')).toEqual(
        '3-598-21507-X'
      );
    });

    it('valid isbn-13', () => {
      expect(service['format']('9783161484100')).toEqual(
        '978-31-6148-410-0'
      );
    });
  });
});
