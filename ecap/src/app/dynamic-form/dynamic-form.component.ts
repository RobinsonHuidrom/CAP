
import { FormConfig } from '../../assets/form.config';
import { FormConfigService } from '../services/form-config.service';
import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [    
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSelectModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
  providers: [FormConfigService],
})


export class DynamicFormComponent implements OnChanges {
  @Input() formConfig: FormConfig | null = null;
  formGroups: FormGroup[] = [];
  isLoading = false; // Add a loading state property

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    if (this.formConfig) {
      this.isLoading = true; // Set loading to true when the form is being loaded
      this.createFormGroups(this.formConfig); // Pass the received formConfig to createFormGroups

      // Simulate a delay of 3 seconds before showing the form
      setTimeout(() => {
        this.isLoading = false; // Set loading to false after 3 seconds
      }, 1000);
    }
  }

  private createFormGroups(formConfig: FormConfig) {
    this.formGroups = [];
    if (formConfig?.steps) {
      formConfig.steps.forEach(step => {
        const formGroup = this.fb.group({});
        step.controls.forEach(control => {
          const controlConfig = this.fb.control('');
          if (control.type === 'input') {
            formGroup.addControl(control.label, controlConfig);
          }
        });
        this.formGroups.push(formGroup);
      });
    }
  }

  getControlFromGroup(formGroup: FormGroup, controlName: string): FormControl {
    const control = formGroup.get(controlName);
    return control ? control as FormControl : new FormControl();
  }
}