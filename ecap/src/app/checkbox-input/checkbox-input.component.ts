// src/app/components/dynamic-form/checkbox-input/checkbox-input.component.ts

import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-input',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.css']
})

export class CheckboxInputComponent {
  @Input() config: AbstractControl | null = null;
  @Input() label: string | null = null;  // Add a label input

  get isCheckedControl(): FormControl {
    const control = this.config?.get('isChecked');
    return control instanceof FormControl ? control : new FormControl(false);
  }

  get inputTextControl(): FormControl {
    const control = this.config?.get('inputText');
    return control instanceof FormControl ? control : new FormControl('');
  }
}