import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TitleComponent } from './components/title/title.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TitleComponent
      ],
      imports: [ReactiveFormsModule, SharedModule]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render title component', () => {
    const title = fixture.debugElement.query(By.css('app-title'));
    expect(title).toBeTruthy()
  });

  it('should render form', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.getElementsByTagName('form')).toBeTruthy();
  });

  it('should show empty input', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.getElementsByTagName('input')).toBeTruthy();
  });

  it('should have disabled submit button by default', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('#submit-btn')
    expect(button.disabled).toBeTruthy();
  });

  it('should not call validateISBN() on submit button click', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    spyOn(fixture.componentInstance, 'validate');

    let button = fixture.debugElement.nativeElement.querySelector('#submit-btn');
    button.click();
    tick();
    expect(fixture.componentInstance.validate).not.toHaveBeenCalled();

  }));

  it('should show or hide error message for only hypens and numbers', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.isbnForm.setValue({
      "isbn": "test"
    });

    fixture.detectChanges();

    let errors = fixture.debugElement.nativeElement.querySelector('.isbn-errors');
    expect(errors.textContent).toEqual('Only numbers and hypens are allowed');

    app.isbnForm.patchValue({
      "isbn": "123"
    });

    fixture.detectChanges();

    errors = fixture.debugElement.nativeElement.querySelector('.errors');
    expect(errors).toBeFalsy();
  });

  it('should show convert button after ISBN-10 is typed in input', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.isbnForm.setValue({
      "isbn": "0-9752298-0-X"
    });

    let convertBtn = fixture.debugElement.nativeElement.querySelector('#convert-btn');
    expect(convertBtn).toBeFalsy();

    fixture.detectChanges();

    convertBtn = fixture.debugElement.nativeElement.querySelector('#convert-btn');
    expect(convertBtn).toBeTruthy();
  });

  it('should show validation message after submit', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'validate').and.callThrough();
    app.isbnForm.setValue({
      "isbn": "0-9752298-0-X"
    });

    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelector('#submit-btn');
    button.click();
    tick();

    expect(app.validate).toHaveBeenCalled();
    expect(app.isSubmitted).toBeTruthy()

    fixture.detectChanges();

    let validationMsg = fixture.debugElement.nativeElement.querySelector('.validation-message');
    expect(validationMsg).toBeTruthy();
    expect(validationMsg.textContent).toContain('ISBN-10 is VALID')

    app.isbnForm.setValue({
      "isbn": "0-9752238-0-X"
    });

    fixture.detectChanges();

    button.click();
    tick();

    fixture.detectChanges();
    validationMsg = fixture.debugElement.nativeElement.querySelector('.validation-message');
    expect(validationMsg).toBeTruthy();
    expect(validationMsg.textContent).toContain('ISBN-10 is INVALID')

  }));

});
