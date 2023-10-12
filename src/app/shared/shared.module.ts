import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryBtnDirective } from './directives/button/primary-btn.directive';
import { SecondaryBtnDirective } from './directives/button/secondary-btn.directive';

@NgModule({
  declarations: [PrimaryBtnDirective, SecondaryBtnDirective],
  exports: [PrimaryBtnDirective, SecondaryBtnDirective],
  imports: [CommonModule],
})
export class SharedModule {}
