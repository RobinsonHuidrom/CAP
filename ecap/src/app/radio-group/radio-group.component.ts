// src/app/components/dynamic-form/radio-group/radio-group.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { FormControlConfig } from '../../assets/form-config';

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule
  ],
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.css']
})

export class RadioGroupComponent implements OnInit {
  @Input() config!: FormControlConfig;
  @Input() formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initFormControl();
  }

  initFormControl() {
    const formControl = new FormControl('');
    this.formGroup.addControl(this.config.controlName, formControl);
  }
}
