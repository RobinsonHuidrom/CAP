export interface FormOption {
  label: string;
  value: any;
  type?: 'input';
  defaultValue?: any;  // Add this line
  children?: FormControlConfig[];
}

export interface FormControlConfig {
  type: 'checkbox' | 'checkbox-group' | 'radio-group' | 'checkbox-input' | 'input';
  controlName: string;
  label: string;
  options?: FormOption[];
  defaultValue?: any;
  children?: FormControlConfig[];
}

export interface FormStepConfig {
  label: string;
  controls: FormControlConfig[];
}

export interface FormConfig {
  id: number;
  name: string;
  formId: number;
  steps: FormStepConfig[];
}
