export interface FormControlConfig {
    type: 'checkbox' | 'radio' | 'input';
    label: string;
    options?: string[];
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


  