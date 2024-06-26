


// app.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormConfig } from '../assets/form-config';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormSelectionComponent } from './form-selection/form-selection.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      CommonModule, 
      RouterOutlet, 
      FormSelectionComponent,
      DynamicFormComponent, 
     ]
})
export class AppComponent {
  selectedFormConfig: FormConfig | null = null;
  title: any;
  onFormSelected(formConfig: FormConfig) {
    this.selectedFormConfig = formConfig;
  }
}
