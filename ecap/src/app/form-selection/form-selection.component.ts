


// form-selection.component.ts

import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormConfigService } from '../services/form-config.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormConfig } from '../../assets/form-config';

@Component({
  selector: 'app-form-selection',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './form-selection.component.html',
  styleUrls: ['./form-selection.component.css'],
  providers: [FormConfigService],
})

export class FormSelectionComponent implements OnDestroy {
  @Output() formSelected = new EventEmitter<FormConfig>();
  formConfigs: FormConfig[] = [];
  isLoading = true;
  error: string | null = null;

  private formConfigsSubscription: Subscription;

  constructor(private formConfigService: FormConfigService) {
    this.formConfigsSubscription = this.formConfigService.formConfigs$.subscribe({
      next: (formConfigs) => {
        this.formConfigs = formConfigs;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.error = 'Error loading form configurations'; // Set a generic error message
        console.error('Error loading form configurations:', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.formConfigsSubscription.unsubscribe();
  }

  onFormSelected(formId: string | number): void {
    if (formId && formId !== '') { // Check for truthy value and non-empty string
      const numericFormId = Number(formId);
      const selectedFormConfig = this.formConfigs.find(config => config.formId === numericFormId);
      if (selectedFormConfig) {
        this.formSelected.emit(selectedFormConfig);
      } else {
        console.error('Form with ID', numericFormId, 'not found in available configurations.');
      }
    } 
  }
}
 