import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[primary-btn]'
})
export class PrimaryBtnDirective {
  @Input() size: 'small' | 'normal' = 'normal';
  @HostBinding('class') get classes(): string {
    return `btn btn--primary ${this.size === 'small' ? 'btn--small' : ''}`;
  }
}
