import { Component, OnInit, OnChanges, SimpleChanges, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, FormArray, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormConfig, FormControlConfig } from '../../assets/form-config';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CheckboxGroupComponent } from '../checkbox-group/checkbox-group.component';
import { RadioGroupComponent } from '../radio-group/radio-group.component';
import { CheckboxInputComponent } from '../checkbox-input/checkbox-input.component';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatCheckboxModule, 
    MatFormFieldModule, 
    MatInputModule, 
    CheckboxGroupComponent, 
    RadioGroupComponent, 
    CheckboxInputComponent
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})

export class DynamicFormComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() formConfig: FormConfig | null = null;
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if(this.formGroup)
      this.formConfig?.steps.forEach(step => {
        this.formGroup = this.fb.group(this.buildFormControls(step.controls));
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formConfig'] && this.formConfig) {
      this.createFormGroup(this.formConfig);
    }
  }

  createFormGroup(formConfig: FormConfig) {
    this.formGroup = this.fb.group(this.buildFormControls(formConfig.steps[0].controls));
  }
  
  buildFormControls(controls: FormControlConfig[]): { [key: string]: any } {
    const group: { [key: string]: any } = {};
    
    controls.forEach(control => {
      if (control.type === 'checkbox-group') {
        group[control.controlName] = this.fb.array(control.options!.map(option => this.fb.group({
          checked: new FormControl(false),
          input: new FormControl(option.defaultValue || '')
        })));
        if (control.children && control.children.length) {
          control.children.forEach(child => {
            group[child.controlName] = this.fb.group(this.buildFormControls(child.children || []));
          });
        }
      } else if (control.type === 'radio-group') {
        group[control.controlName] = new FormControl('');
      } else if (control.type === 'checkbox') {
        group[control.controlName] = this.fb.control(false);
      } else if (control.type === 'input') {
        group[control.controlName] = this.fb.control(control.defaultValue || '');
      } else if (control.type === 'checkbox-input') {
        group[control.controlName] = this.fb.group({
          isChecked: new FormControl(control.defaultValue || false),
          inputText: new FormControl('')
        });
      }
    });
    
    return group;
  }
  
  createNestedControl(control: FormControlConfig): AbstractControl {
    if (this.hasChildren(control)) {
      return this.fb.group(this.buildFormControls(control.children!));
    }

    switch (control.type) {
      case 'checkbox-group':
        return this.fb.array(
          control.options!.map(option => this.fb.group({
            checked: new FormControl(false),
            input: new FormControl(option.defaultValue || '') 
          }))
        );
      case 'checkbox-input':
        return this.fb.group({
          isChecked: [false],
          inputText: ['']
        });
      case 'checkbox':
        return this.fb.control(false);
      case 'radio-group':
        return this.fb.control('');
      default: 
        return this.fb.control(control.defaultValue || '');
    }
  }

  private hasChildren(control: FormControlConfig): boolean {
    return control.children !== undefined && control.children.length > 0;
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }
}