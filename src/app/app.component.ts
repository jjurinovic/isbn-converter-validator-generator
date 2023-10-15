import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IsbnService } from './services/isbn.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isbnForm: FormGroup
  public isIsbnValid: boolean = false;
  public isSubmitted: boolean = false;
  public isbn13?: string | null;
  public isbnLength: number = 0;

  constructor(private fb: FormBuilder, private _isbn: IsbnService) {
    this.isbnForm = this.fb.group({
      isbn: ['', [Validators.required, Validators.pattern('^[0-9 -Xx]+$')]],
    });

    this.isbnForm.controls['isbn'].valueChanges.subscribe((change) => {
      this.isbnLength = this._isbn.removeHypens(change).length;

      // when value is converted to ISBN-13, set input value and do not reset
      if (change !== this.isbn13) {
        this.isSubmitted = false;
        this.isbn13 = null;
      }
    });
  }

  /**
   * Validate ISBN on button click
   */
  public validate(): void {
    const isbnValue = this.isbnForm.get('isbn')?.value;
    this.isIsbnValid = this._isbn.validate(isbnValue);
    this.isSubmitted = true;
  }

  /**
   * Convert ISBN-10 value from input to ISBN-13
   */
  public convertToIsbn13(): void {
    // reset values
    this.isSubmitted = false;
    this.isIsbnValid = false;
    this.isbn13 = null;

    // validate ISBN
    // if it's not valid, do not proceed with conversion
    this.validate();
    if (this.isIsbnValid) {
      // convert ISBN-10 to ISBN-13
      this.isbn13 = this._isbn.convertTo13(
        this.isbnForm.get('isbn')?.value
      );

      // set input value to converted value
      this.isbnForm.patchValue({ isbn: this.isbn13 });
    }
  }

  /**
   * Check if ISBN length is correct
   * @returns {boolean} Return true if ISBN length is 10 or 13
   */
  public isIsbn10Or13(): boolean {
    return this.isbnLength === 10 || this.isbnLength === 13;
  }

  /**
   * Generate ISBN depending on type and patch to input
   * @param isbnType isbn type: 10 or 13
   */
  public generateIsbn(isbnType: number): void {
    const generatedIsbn = this._isbn.generate(isbnType);
    this.isbnForm.patchValue({ isbn: generatedIsbn });
  }

  public hasPatternError(): boolean {
    return this.isbnForm.get('isbn')?.errors?.['pattern']
  }
}
