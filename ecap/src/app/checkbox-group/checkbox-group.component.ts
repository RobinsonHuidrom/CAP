
// src/app/components/dynamic-form/checkbox-group/checkbox-group.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControlConfig } from '../../assets/form-config';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-checkbox-group',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    DynamicFormComponent
  ],
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.css'],
})

export class CheckboxGroupComponent implements OnInit {
  @Input() config!: FormControlConfig;
  @Input() formGroup!: FormGroup;
  checkboxArray!: FormArray;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initFormArray();
  }

  initFormArray() {
    this.checkboxArray = this.fb.array(this.config.options!.map(option => this.fb.group({
      checked: new FormControl(false),
      input: new FormControl(option.defaultValue || '')
    })));
    this.formGroup.addControl(this.config.controlName, this.checkboxArray);
  }

  get formArray(): FormArray {
    return this.formGroup.get(this.config.controlName) as FormArray;
  }

  getFormControl(index: number): FormGroup {
    return this.formArray.at(index) as FormGroup;
  }

  getCheckedControl(index: number): FormControl {
    return this.getFormControl(index).get('checked') as FormControl;
  }

  getInputControl(index: number): FormControl {
    return this.getFormControl(index).get('input') as FormControl;
  }
}