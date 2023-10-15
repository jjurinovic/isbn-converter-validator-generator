import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validation-icon',
  templateUrl: './validation-icon.component.html',
  styleUrls: ['./validation-icon.component.scss']
})
export class ValidationIconComponent {
  @Input() valid: boolean = false;
}
