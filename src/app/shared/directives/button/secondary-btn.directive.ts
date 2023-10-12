import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[secondary-btn]'
})
export class SecondaryBtnDirective {
  @Input() size: 'small' | 'normal' = 'normal';
  @HostBinding('class') get classes(): string {
    return `btn btn--secondary ${this.size === 'small' ? 'btn--small' : ''}`;
  }
}
