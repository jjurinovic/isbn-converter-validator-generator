import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PrimaryBtnDirective } from './primary-btn.directive';

@Component({
  template: `
    <button>Normal button</button>
    <button primary-btn>Primary button</button>
    <button primary-btn size="small">Primary button small</button>
  `,
})
class TestComponent {}

describe('PrimaryBtnDirective', () => {
  let fixture, primaryBtns: any, normalBtn;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [PrimaryBtnDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges();

    primaryBtns = fixture.debugElement.queryAll(By.directive(PrimaryBtnDirective));
    normalBtn = fixture.debugElement.queryAll(By.css('button:not([primary-btn])'))
  });

  it('should create an instance', () => {
    const directive = new PrimaryBtnDirective();
    expect(directive).toBeTruthy();
  });

  it('should create 2 primary buttons', () => {
    expect(primaryBtns.length).toBe(2)
  });

  it('should create one button without directive', () => {
    expect(normalBtn.length).toBe(1);
  });

  it('should add primary button css classes to buttons with directive', () => {
    expect(primaryBtns[0].nativeElement.classList.contains('btn')).toBeTrue()
    expect(primaryBtns[0].nativeElement.classList.contains('btn--primary')).toBeTrue()
  });

  it('should add size small css class', () => {
    expect(primaryBtns[1].nativeElement.classList.contains('btn--small')).toBeTrue()
  });
});
