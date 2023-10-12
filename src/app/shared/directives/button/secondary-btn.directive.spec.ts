import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SecondaryBtnDirective } from './secondary-btn.directive';

@Component({
  template: `
    <button>Normal button</button>
    <button secondary-btn>Secondary button</button>
    <button secondary-btn size="small">Primary button small</button>
  `,
})
class TestComponent {}

describe('SecondaryBtnDirective', () => {
  let fixture, secondaryBtns: any, normalBtn;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [SecondaryBtnDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();

    secondaryBtns = fixture.debugElement.queryAll(By.directive(SecondaryBtnDirective));
    normalBtn = fixture.debugElement.queryAll(By.css('button:not([secondary-btn])'))
  });

  it('should create an instance', () => {
    const directive = new SecondaryBtnDirective();
    expect(directive).toBeTruthy();
  });

  it('should create 2 secondary buttons', () => {
    expect(secondaryBtns.length).toBe(2)
  });

  it('should create one button without directive', () => {
    expect(normalBtn.length).toBe(1);
  });

  it('should add secondary button css classes to buttons with directive', () => {
    expect(secondaryBtns[0].nativeElement.classList.contains('btn')).toBeTrue()
    expect(secondaryBtns[0].nativeElement.classList.contains('btn--secondary')).toBeTrue()
  });

  it('should add size small css class', () => {
    expect(secondaryBtns[1].nativeElement.classList.contains('btn--small')).toBeTrue()
  });
});
