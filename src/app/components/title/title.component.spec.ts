import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleComponent } from './title.component';
import { By } from '@angular/platform-browser';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;
  let h2: HTMLElement;
  let h3: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    h2 = fixture.nativeElement.querySelector('h2');
    h3 = fixture.nativeElement.querySelector('h3');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    expect(h2.textContent).toContain('ISBN');
  });

  it('should display subtitle', () => {
    expect(h3.textContent).toContain('Validator');
    expect(h3.textContent).toContain('Generator');
    expect(h3.textContent).toContain('Converter');
  });
});
