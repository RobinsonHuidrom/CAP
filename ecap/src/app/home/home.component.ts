import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {CommonModule} from '@angular/common';

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
    MatCardModule,
    MatListModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  isClockEnabled!: boolean;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initFirstFormGroup();
    this.initSecondFormGroup();
    this.initThirdFormGroup();
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
      direction: [''],
    });
  }

  private initThirdFormGroup(): void {
  
    const tumorList = this.tumorlist();
    const checkboxes = this.checklist();
  
    const tumorFormArray = this._formBuilder.array(
      tumorList.map((tumor) => this._formBuilder.control(false))
    );
  
    const clockFormArray = this._formBuilder.array(
      checkboxes.map((checkbox) => this._formBuilder.control(false))
    );
  
    this.thirdFormGroup = this._formBuilder.group({
      tumorSites: tumorFormArray,
      clock: clockFormArray,
      distance: [''],
      distance2: [''],
    });
  
    // Subscribe to changes in both tumorSites and clock FormArrays
    tumorFormArray.valueChanges.subscribe((selectedTumors) => {
      const selectedTumorValues = tumorList
        .filter((tumor, index) => selectedTumors[index])
        .map((tumor) => tumor.value);
      console.log('Selected Tumor Names:', selectedTumorValues);
    });
  
    clockFormArray.valueChanges.subscribe((selectedClocks) => {
      const selectedClockValues = checkboxes
        .filter((checkbox, index) => selectedClocks[index])
        .map((checkbox) => checkbox.value);
      console.log('Selected Clock Names:', selectedClockValues);
    });
  }
  
  isClockPositionSelected = false;
  updateClockPositionSelection(event: MatCheckboxChange) {
    this.isClockPositionSelected = event.checked;
  }

  showOtherField: boolean = false;
  onRadioChange(event: MatRadioChange) {
    if (event.value === 'Other (specify)') {
      this.showOtherField = true;
    } else {
      this.showOtherField = false;
    }
  }

  tumorlist(): any[] {
    return [ 
      { id: 1, value: 'Upper outer quadrant', isSelected: false },
      { id: 2, value: 'Lower outer quadrant', isSelected: false },
      { id: 3, value: 'Upper inner quadrant', isSelected: false },
      { id: 4, value: 'Lower inner quadrant', isSelected: false },
      { id: 5, value: 'Central', isSelected: false },
      { id: 6, value: 'Nipple', isSelected: false },
    ];
  }

  checklist(): any[] {
    return [
      { id: 1, value: '1 o clock', isSelected: false },
      { id: 2, value: '2 o clock', isSelected: false },
      { id: 3, value: '3 o clock', isSelected: false },
      { id: 4, value: '4 o clock', isSelected: false },
      { id: 5, value: '5 o clock', isSelected: false },
      { id: 6, value: '6 o clock', isSelected: false },
      { id: 7, value: '7 o clock', isSelected: false },
      { id: 8, value: '8 o clock', isSelected: false },
      { id: 9, value: '9 o clock', isSelected: false },
      { id: 10, value: '10 o clock', isSelected: false },
      { id: 11, value: '11 o clock', isSelected: false },
      { id: 12, value: '12 o clock', isSelected: false },
    ];
  }

  getPreviewValues(): string {
    const firstStepValues = this.firstFormGroup.value;
    const secondStepValues = this.secondFormGroup.value;
    const thirdStepValues = this.thirdFormGroup.value;
  
    const selectedTumorValues = thirdStepValues.tumorSites
    .map((isSelected: boolean, index: number) => isSelected ? this.tumorlist()[index].value : null)
    .filter((value: string | null) => value !== null);
  
    const selectedClocks = thirdStepValues.clock
    .map((isSelected: boolean, index: number) => isSelected ? this.checklist()[index].value : null)
    .filter((value: string | null) => value !== null);
  
    const preview = `
    Patient Details:
    Name: ${firstStepValues.name}
    Age: ${firstStepValues.age}
    LAB Number: ${firstStepValues.labNo}
    Gender:  ${firstStepValues.gender}
    Address: ${firstStepValues.address}

    Specimen:
    Procedure: ${secondStepValues.procedure}
    Comment: ${secondStepValues.comment}
    Specimen Laterality: ${secondStepValues.direction}

    Tumor:
    Tumor Site:  ${selectedTumorValues.join(', ')}
    Clock Position: ${selectedClocks.join(', ')}
    Distance from Nipple: ${thirdStepValues.distance}
    Other: ${thirdStepValues.distance2}
  `;

    return preview;
  }



}
