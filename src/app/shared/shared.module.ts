import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryBtnDirective } from './directives/button/primary-btn.directive';
import { SecondaryBtnDirective } from './directives/button/secondary-btn.directive';
import { ValidationIconComponent } from './components/validation-icon/validation-icon.component';

@NgModule({
  declarations: [PrimaryBtnDirective, SecondaryBtnDirective, ValidationIconComponent],
  exports: [PrimaryBtnDirective, SecondaryBtnDirective, ValidationIconComponent],
  imports: [CommonModule],
})
export class SharedModule {}
