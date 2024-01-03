
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';

interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[]; // Note the change here to use Task[] for subtasks
  dataInput: string | number | 'Not Specified';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports:  [
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
    CommonModule,
    
 ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  allComplete = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup; 
  isClockSubtaskDisabled = true;
  disableCheckboxes = false;
  notSpecifiedSelected = false;

  constructor(private _formBuilder: FormBuilder, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initFirstFormGroup();
    this.initSecondFormGroup();
    this.initThirdFormGroup();
    this.initFourthFormGroup();
    this.initSubtaskState();
  }

  private initFirstFormGroup(): void {
    this.firstFormGroup = this._formBuilder.group({
      name: [''],
      age: [''],
      gender: [''],
      labNo: [''],
      address: [''],
    });
  }  

  private initSecondFormGroup(): void {
    this.secondFormGroup = this._formBuilder.group({
      procedure: [''],
      comment: [''],
      direction: ['']
    });
  }

  private initThirdFormGroup(): void {
    const group: any = {};

    (this.task.subtasks || []).forEach(subtask => {
      group[subtask.name] = this._formBuilder.control(subtask.dataInput);
    });

    this.thirdFormGroup = this._formBuilder.group(group);
  }
  

  private initFourthFormGroup(): void {
    this.fourthFormGroup = this._formBuilder.group({
      histologic:[''],
      cellularity:[''],
      atypia:[''],
      overGrowth:[''],
      mitotic:[''],
      mitoticRate:[''],
      tumorBorder:[''],
      malignant:[''],
      commentMalignant:['']
    });
  }


  // For secondFormGroup Other specify comment
  showOtherField: boolean = false;
  onRadioChange(event: MatRadioChange) {

    this.showOtherField = event.value === 'Other';

    // If not selecting "Other", clear the comment value
    if (!this.showOtherField) {
      this.secondFormGroup.get('comment')?.setValue(null);
    }

    if (event.value === 'Other') {
      this.showOtherField = true;
    } else {
      this.showOtherField = false;
    }

    this.cdRef.detectChanges(); // Trigger change detection
  }
  

  private initSubtaskState(): void {
    const clockPositionTask = this.task.subtasks?.find(subtask => subtask.name === 'Clock position');
    this.isClockSubtaskDisabled = !(clockPositionTask?.completed ?? true);

    this.thirdFormGroup.addControl('distanceFromNipple', new FormControl(''));
    this.thirdFormGroup.addControl('otherSpecify', new FormControl(''));
  }

  updateAllComplete(subtask: Task) {
    subtask.completed = !subtask.completed;
    this.allComplete = !!(this.task?.subtasks?.length && this.task.subtasks.every(t => t.completed));
  
    if (subtask.name === 'Clock position') {
      this.isClockSubtaskDisabled = !subtask.completed;
    }
  }  
  
  someComplete(): boolean {
    if (!this.task.subtasks) {
      return false;
    }
  
    const clockSubtasksCompleted = (this.task.subtasks
      .find(subtask => subtask.name === 'Clock position')
      ?.subtasks?.some(clockSubtask => clockSubtask.completed)) || false;
  
    return this.task.subtasks.some(t => t.completed) || (clockSubtasksCompleted && !this.allComplete);
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
  
    (this.task.subtasks || []).forEach(t => {
      t.completed = completed;
      if (t.subtasks) {
        t.subtasks.forEach(subtask => (subtask.completed = completed));
      }
      this.isClockSubtaskDisabled = !completed;
    });
  }
  
  onCheckboxChange(event: MatCheckboxChange, controlName: string): void {
    const formControl = this.thirdFormGroup.get(controlName) as FormControl;
    formControl.enable();
    formControl.setValue(event.checked ? '' : null);
  }

  resetthirdFormGroup(): void {
    this.thirdFormGroup.reset();
    this.allComplete = false;
    this.isClockSubtaskDisabled = true;
    this.disableCheckboxes = true;
  
    (this.task.subtasks || []).forEach(subtask => {
      subtask.completed = false;
      if (subtask.subtasks) {
        subtask.subtasks.forEach(subsubtask => subsubtask.completed = false);
      }
    });
  }

  resetAndToggleDisable(): void {
    this.resetthirdFormGroup();
    this.disableCheckboxes = !this.disableCheckboxes; // Toggle the disableCheckboxes flag
    this.notSpecifiedSelected = !this.notSpecifiedSelected;
    this.allComplete = false; // Reset the "allComplete" flag to enable the checkbox
  }
  
// FourthFormGroup functions 
  showMitoticRate: boolean = false;
  onMitoticChange(event: MatRadioChange) {
    if (event.value === 'Mitotic') {
      this.showMitoticRate = true;
    } else {
      this.showMitoticRate = false;
    }
  }

getPreviewValues(): string {
    const firstStepValues = this.firstFormGroup.value;
    const secondStepValues = this.secondFormGroup.value;
    const thirdStepValues = this.thirdFormGroup.value; 
    const fourthStepValues = this.fourthFormGroup.value; 
   
    let tumorSite = '';
  
    this.task?.subtasks?.forEach(subtask => {
      if (subtask.completed && subtask.name !== 'Tumor Site (select all that apply)') {
        if (subtask.name === 'Specify distance from nipple in Centimeters') {
          const distance = this.thirdFormGroup?.get('distanceFromNipple')?.value;
          tumorSite += `  - Specify distance from nipple in Centimeters: ${distance} cm\n`;
        } else if (subtask.name === 'Other (specify)') {
          const otherSpecifyValue = this.thirdFormGroup?.get('otherSpecify')?.value;
          if (otherSpecifyValue) {
            tumorSite += `  - Other (specify): ${otherSpecifyValue}\n`;
          }
        } else {
          tumorSite += `  - ${subtask.name}\n`;
  
          if (subtask.subtasks) {
            subtask.subtasks.forEach(clockSubtask => {
              if (clockSubtask.completed) {
                tumorSite += `    - ${clockSubtask.name}\n`;
              }
            });
          }
        }
      }
    });

 // Include the "Not Specified" value in the preview only if it's not disabled
if (this.notSpecifiedSelected && !this.disableCheckboxes) {
  tumorSite += ' - Not Specified\n';
}
  
const preview =
` Patient Details:\n` +
`   Name: ${firstStepValues.name}\n` +
`   Age: ${firstStepValues.age}\n` +
`   Gender: ${firstStepValues.gender}\n` +
`   Adress: ${firstStepValues.address}\n` +
`   LAB Number: ${firstStepValues.labNo}\n\n` +

` Specimen Details:\n` +
`   Procedure: ${secondStepValues.procedure}\n` +
`   Comment: ${secondStepValues.comment}\n` +
`   Laterality: ${secondStepValues.direction}\n\n` +

` Tumor Site:\n${tumorSite} \n\n` +

` Malignant phyllodes Tumor:\n` +
`   Histologic Type: ${fourthStepValues.histologic}\n` +
`   Stromal Cellularity: ${fourthStepValues.cellularity}\n` +
`   Stromal Atypia: ${fourthStepValues.atypia}\n` +
`   Stromal Overgrowth: ${fourthStepValues.overGrowth}\n` +
`   Mitotic Rate: ${fourthStepValues.mitoticRate}\n` +
`   Histologic Tumor Border: ${fourthStepValues.tumorBorder}\n` + 
`   Malignant Heterologous Elements: ${fourthStepValues.malignant}\n`;

  return preview;
}
  

  task: Task = {
    name: 'Tumor Site (select all that apply)',
    completed: false,
    dataInput: '',
    subtasks: [
      { name: 'Upper outer quadrant', completed: false,  dataInput: '' },
      { name: 'Lower outer quadrant', completed: false,  dataInput: '' },
      { name: 'Upper inner quadrant', completed: false,  dataInput: '' },
      { name: 'Lower inner quadrant', completed: false ,  dataInput: ''},
      { name: 'Central', completed: false ,  dataInput: ''},
      { name: 'Nipple', completed: false ,  dataInput: '' },
      {
        name: 'Clock position',
        completed: false,
        dataInput: '',
        subtasks: [
          { name: '1 o\'clock', completed: false ,  dataInput: ''},
          { name: '2 o\'clock', completed: false ,  dataInput: ''},
          { name: '3 o\'clock', completed: false ,  dataInput: ''},
          { name: '4 o\'clock', completed: false ,  dataInput: ''},
          { name: '5 o\'clock', completed: false ,  dataInput: ''},
          { name: '6 o\'clock', completed: false ,  dataInput: ''},
          { name: '7 o\'clock', completed: false ,  dataInput: ''},
          { name: '8 o\'clock', completed: false ,  dataInput: ''},
          { name: '9 o\'clock', completed: false ,  dataInput: ''},
          { name: '10 o\'clock', completed: false ,  dataInput: ''},
          { name: '11 o\'clock', completed: false ,  dataInput: ''},
          { name: '12 o\'clock', completed: false ,  dataInput: ''},
        ],
      },
      {
        name: 'Specify distance from nipple in Centimeters',
        completed: false,
        dataInput: '', // Added dataInput to capture text input
      },
      {
        name: 'Other (specify)',
        completed: false,
        dataInput: '', // Added dataInput to capture text input
      },
    ],
  };
}